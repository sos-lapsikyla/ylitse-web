import { createApi } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { parseAndTransformTo, refreshingBaseQuery } from '@/utils/http';
import { pipe } from 'fp-ts/lib/function';
import type { ChatBuddy, PollingParam } from './mappers';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import {
  statusUpdateErrorMessages,
  statusUpdateSuccessMessages,
} from './constants';
import { role } from '../Authentication/authenticationApi';

const status = D.literal('banned', 'archived', 'ok', 'deleted');

const optionalProperties = D.partial({
  status: status,
});
const mandatoryProperties = D.struct({
  display_name: D.string,
  id: D.string,
  role: role,
});

const contactCodec = pipe(mandatoryProperties, D.intersect(optionalProperties));

const contactsResponseCodec = D.struct({ resources: D.array(contactCodec) });

const messageData = D.struct({
  content: D.string,
  opened: D.boolean,
  recipient_id: D.string,
  sender_id: D.string,
});

const messageDetails = D.struct({
  id: D.string,
  created: D.string,
});

const messageCodec = pipe(messageData, D.intersect(messageDetails));

const messagesResponseCodec = D.struct({
  resources: D.array(messageCodec),
  contacts: D.array(contactCodec),
});

type MessageData = D.TypeOf<typeof messageData>;
type Message = D.TypeOf<typeof messageCodec>;
export type AppMessage = {
  isSent: boolean;
  id: string;
  content: string;
  opened: boolean;
  created: string;
  buddyId: string;
};

type ChatStatus = D.TypeOf<typeof status>;
export type ChatFolder = Exclude<ChatStatus, 'deleted'>;

type Contact = D.TypeOf<typeof contactCodec>;
export type Buddy = Omit<Contact, 'display_name' | 'id' | 'status'> & {
  buddyId: string;
  displayName: string;
  status: ChatFolder;
};

type MessageQuery = {
  userId: string;
  params: PollingParam;
};

export type MessageResponse = {
  messages: Array<AppMessage>;
  buddies: Array<Buddy>;
};

export type NewMessage = {
  message: MessageData;
  userId: string;
};

type PutMessage = {
  message: Message;
  userId: string;
};

type PutStatus = {
  buddyId: string;
  status: ChatFolder;
  userId: string;
};

type reportMessage = {
  buddyId: string;
  contactInfo: string;
  reportReason: string;
  userId: string;
};

const toQueryString = (params: PollingParam) => {
  const maxMessagesAtOnce = 10;

  if (params.type === 'New' && params.previousMsgId.length > 0) {
    return `from_message_id=${params.previousMsgId}&desc=false&max=${maxMessagesAtOnce}`;
  }

  if (params.type === 'OlderThan') {
    return `contact_user_ids=${params.buddyId}&from_message_id=${params.messageId}&max=${maxMessagesAtOnce}&desc=true`;
  }

  if (params.type === 'InitialMessages') {
    const userIds = params.buddyIds.join(',');

    return `contact_user_ids=${userIds}&max=${maxMessagesAtOnce}&desc=true`;
  }

  return `max=${maxMessagesAtOnce}&desc=true`;
};

export const chatApi = createApi({
  baseQuery: refreshingBaseQuery,
  reducerPath: 'chatsApi',
  endpoints: builder => ({
    getContacts: builder.query<Array<Buddy>, string>({
      query: userId => `users/${userId}/contacts`,
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          contactsResponseCodec,
          { resources: [] },
          ({ resources }) => toAppBuddies(resources),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('chat:notification.fetchingContactsError'), {
            id: 'contact-fetch-failure',
          });
        }
      },
    }),
    getMessages: builder.query<MessageResponse, MessageQuery>({
      query: ({ userId, params }) =>
        `users/${userId}/messages?${toQueryString(params)}`,
      transformResponse: (response: unknown, _meta, { userId }) =>
        parseAndTransformTo(
          response,
          messagesResponseCodec,
          { resources: [], contacts: [] },
          ({ resources, contacts }) => ({
            messages: [...resources]
              .map(toAppMessage(userId))
              .sort(sortByCreated),
            buddies: toAppBuddies(contacts),
          }),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('chat:notification.pollingError'), {
            id: 'poll-failure',
          });
        }
      },
    }),
    sendMessage: builder.mutation<unknown, NewMessage>({
      query: ({ userId, message }) => ({
        url: `users/${userId}/messages`,
        method: 'post',
        body: message,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('chat:notification.messageSendError'), {
            id: 'message-send-failure',
          });
        }
      },
    }),
    markSeen: builder.mutation<unknown, PutMessage>({
      query: ({ userId, message }) => ({
        url: `users/${userId}/messages/${message.id}`,
        method: 'put',
        body: { ...toSeen(message), active: true },
      }),
    }),
    updateStatus: builder.mutation<unknown, PutStatus>({
      query: ({ userId, buddyId, status }) => ({
        url: `users/${userId}/contacts/${buddyId}`,
        method: 'put',
        body: { status },
      }),
      async onQueryStarted({ status }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t(statusUpdateSuccessMessages[status]), {
            id: `${status}-status-success`,
          });
        } catch (err) {
          toast.error(t(statusUpdateErrorMessages[status]), {
            id: `${status}-status-failure`,
          });
        }
      },
    }),
    reportMentor: builder.mutation<unknown, reportMessage>({
      query: ({ buddyId, contactInfo, reportReason, userId }) => ({
        url: `reports`,
        method: 'post',
        body: {
          contact_field: contactInfo,
          report_reason: reportReason,
          reported_user_id: buddyId,
          reporter_user_id: userId,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('chat:dialog.report.failure'), {
            id: `report-failure`,
          });
        }
      },
    }),
  }),
});

const toAppBuddies = (contacts: Array<Contact>): Array<Buddy> =>
  contacts.flatMap(toBuddy);

const toBuddy = ({ display_name, id, role, ...rest }: Contact) => {
  if (rest?.status === 'deleted') {
    return [];
  }

  return {
    displayName: display_name,
    buddyId: id,
    status: rest?.status ?? 'ok',
    role,
  } as Buddy;
};

const toAppMessage =
  (userId: string) =>
  ({ sender_id, recipient_id, opened, ...rest }: Message): AppMessage => {
    const isSent = userId === sender_id;
    return {
      buddyId: isSent ? recipient_id : sender_id,
      opened: isSent ? true : opened,
      isSent,
      ...rest,
    };
  };

export const sortByCreated = (a: AppMessage, b: AppMessage) => {
  return a.created < b.created ? -1 : 1;
};

export const extractMostRecentId = (
  existingChats: Record<string, ChatBuddy>,
  newMessages: Array<AppMessage>,
) => {
  const fromExisting = Object.keys(existingChats).reduce<Array<AppMessage>>(
    (messages, buddyId) => {
      return messages.concat(existingChats[buddyId].messages);
    },
    [],
  );

  const allMessages = fromExisting
    .concat(newMessages)
    .sort(sortByCreated)
    .reverse();

  return allMessages[0]?.id ?? '';
};

const toSeen = (msg: Message) => ({ ...msg, opened: true });

export const toPutMessage = (
  msg: AppMessage,
  buddyId: string,
  userId: string,
): Message => ({
  sender_id: userId,
  recipient_id: buddyId,
  content: msg.content,
  created: msg.created,
  id: msg.id,
  opened: msg.opened,
});

export const toSendMessage = (
  buddyId: string,
  userId: string,
  text: string,
) => ({
  recipient_id: buddyId,
  sender_id: userId,
  content: text,
  opened: false,
});

export const {
  useGetContactsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkSeenMutation,
  useUpdateStatusMutation,
  useReportMentorMutation,
} = chatApi;
