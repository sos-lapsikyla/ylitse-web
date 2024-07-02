import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import {
  chatApi,
  ChatFolder,
  extractMostRecentId,
  AppMessage,
  Buddy,
  MessageResponse,
  sortByCreated,
} from './chatPageApi';

export type ChatBuddy = Buddy & {
  messages: AppMessage[];
};

export type PollingParam =
  | {
      type: 'New';
      previousMsgId: string;
    }
  | { type: 'OlderThan'; buddyId: string; messageId: string }
  | { type: 'InitialMessages'; buddyIds: Array<string> };

export type ChatState = {
  showFolders: boolean;
  activeFolder: ChatFolder;
  activeChatId: string | null;
  chats: Record<string, ChatBuddy>;
  pollingParams: Array<PollingParam> | null;
};

type Conversation = {
  name: string;
  buddyId: string;
};

const initialState: ChatState = {
  showFolders: false,
  activeFolder: 'ok',
  activeChatId: null,
  chats: {},
  pollingParams: null,
};

export const chats = createSlice({
  initialState,
  name: 'chats',
  reducers: {
    setShowFolders: (state, action: PayloadAction<boolean>) => {
      state.showFolders = action.payload;
    },
    setActiveFolder: (state, action: PayloadAction<ChatFolder>) => {
      state.activeFolder = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    clearActiveChat: state => {
      state.activeChatId = null;
    },
    addPollParam: (state, action: PayloadAction<PollingParam>) => {
      const currentParams = state.pollingParams ?? [];
      state.pollingParams = [action.payload, ...currentParams];
    },
    setConversation: (state, action: PayloadAction<Conversation>) => {
      const buddyId = action.payload.buddyId;
      const isConversationExisting = Boolean(state.chats[buddyId]);

      state.activeChatId = buddyId;

      if (!isConversationExisting) {
        state.chats = { ...state.chats, [buddyId]: toNewBuddy(action.payload) };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        chatApi.endpoints.getContacts.matchFulfilled,
        (state, { payload }) => {
          const buddyIds = payload.map(({ buddyId }) => buddyId);
          const initialBuddyMessages = createBuddyChunks(buddyIds);
          const chats: Record<string, ChatBuddy> = payload.reduce(
            (acc, curr) => {
              return { ...acc, [curr.buddyId]: { ...curr, messages: [] } };
            },
            {},
          );

          return {
            ...state,
            chats,
            pollingParams: initialBuddyMessages,
          };
        },
      )
      .addMatcher(
        chatApi.endpoints.getMessages.matchFulfilled,
        ({ chats, ...rest }, { payload: response }) => {
          const updatedMessages = mergeMessages(chats, response);
          const mostRecentMessageId = extractMostRecentId(
            chats,
            response.messages,
          );
          const nextPollingParams = getNextParams(
            rest.pollingParams ?? [],
            mostRecentMessageId,
          );

          return {
            ...rest,
            chats: updatedMessages,
            pollingParams: nextPollingParams,
          };
        },
      )
      .addMatcher(
        chatApi.endpoints.markSeen.matchFulfilled,
        ({ chats, ...state }, { meta }) => {
          const {
            message: { id, recipient_id },
          } = meta.arg.originalArgs;
          const updatedMessages = chats[recipient_id].messages.map(msg =>
            msg.id === id ? { ...msg, opened: true } : msg,
          );
          const updatedRecord = {
            ...chats,
            [recipient_id]: {
              ...chats[recipient_id],
              messages: updatedMessages,
            },
          };

          return { ...state, chats: updatedRecord };
        },
      )
      .addMatcher(
        chatApi.endpoints.updateStatus.matchFulfilled,
        ({ chats, ...state }, { meta }) => {
          const { buddyId, status } = meta.arg.originalArgs;

          const updatedRecord = {
            ...chats,
            [buddyId]: {
              ...chats[buddyId],
              status,
            },
          };

          return { ...state, chats: updatedRecord };
        },
      );
  },
});

const toNewBuddy = ({ name, buddyId }: Conversation): ChatBuddy => ({
  displayName: name,
  buddyId,
  role: 'mentor',
  status: 'ok',
  messages: [],
});

const createBuddyChunks = (buddyIds: Array<string>): Array<PollingParam> => {
  const chunkSize = 40;
  const amountOfBatches = Math.ceil(buddyIds.length / chunkSize);

  return [...Array(amountOfBatches).keys()]
    .map(index => buddyIds.slice(index * chunkSize, (index + 1) * chunkSize))
    .map(chunk => ({ type: 'InitialMessages', buddyIds: chunk }));
};

const mergeMessages = (
  originalChats: Record<string, ChatBuddy>,
  response: MessageResponse,
) =>
  response.buddies.reduce((chats, contact) => {
    const newMessages = response.messages.filter(
      ({ buddyId }) => buddyId === contact.buddyId,
    );
    const existingBuddy = originalChats[contact.buddyId];
    const existingMessages = existingBuddy ? existingBuddy.messages : [];

    return {
      ...chats,
      [contact.buddyId]: {
        ...contact,
        messages: existingMessages.concat(newMessages).sort(sortByCreated),
      },
    };
  }, originalChats);

const getNextParams = (
  pollingQueue: Array<PollingParam>,
  previousMsgId: string,
): Array<PollingParam> => {
  const normalPoll = { type: 'New', previousMsgId } as const;
  const nextParams = pollingQueue.slice(1);
  // If params exist, resolve those - when no params, then do the 'normalPoll'
  return nextParams.length > 0 ? nextParams : [normalPoll];
};

const selectChatState = ({ chats }: RootState) => chats;

export const selectActiveChat = createSelector(
  selectChatState,
  ({ activeChatId, chats }) => (activeChatId ? chats[activeChatId] : null),
);

export const selectBuddyMessages = (buddyId: string) =>
  createSelector(
    selectChatState,
    selectIsLoadingBuddyMessages(buddyId),
    ({ chats }, isLoading) => {
      const buddy = chats[buddyId];
      const hasMessages = buddy.messages.length > 0;
      const unread = buddy.messages.filter(message => !message.opened);

      return {
        latest: hasMessages
          ? buddy.messages[buddy.messages.length - 1].content
          : '',
        unread: { hasUnread: unread.length > 0, count: unread.length },
        isLoading,
      };
    },
  );

export const selectChats = createSelector(
  selectChatState,
  ({ activeFolder, chats }) => {
    const filtered = Object.keys(chats)
      .map(buddyId => chats[buddyId])
      .filter(chat => chat.status === activeFolder);
    return filtered;
  },
);

export const selectHasUnreadMessages = createSelector(
  selectChatState,
  ({ chats }): boolean =>
    Object.values(chats)
      .filter(chat => chat.status === 'ok')
      .map(chat => chat.messages)
      .flat()
      .some(message => !message.opened),
);

const defaultParam: PollingParam = { type: 'New', previousMsgId: '' };
export const selectCurrentPollingParams = createSelector(
  selectChatState,
  ({ pollingParams }) => {
    if (!pollingParams) return null;
    if (pollingParams.length === 0) return defaultParam;
    return pollingParams[0];
  },
);

const isLoadingOlderMessages = (pollingParams: PollingParam, buddyId: string) =>
  pollingParams.type === 'OlderThan' && pollingParams.buddyId === buddyId;

const isLoadingInitialMessages = (
  pollingParams: PollingParam,
  buddyId: string,
) =>
  pollingParams.type === 'InitialMessages' &&
  pollingParams.buddyIds.includes(buddyId);

export const selectIsLoadingBuddyMessages = (buddyId?: string) =>
  createSelector(selectChatState, ({ pollingParams }) => {
    if (!pollingParams || !buddyId) {
      return false;
    }

    return pollingParams.some(
      param =>
        isLoadingOlderMessages(param, buddyId) ||
        isLoadingInitialMessages(param, buddyId),
    );
  });

export const {
  setShowFolders,
  setActiveFolder,
  setActiveChat,
  clearActiveChat,
  addPollParam,
  setConversation,
} = chats.actions;
