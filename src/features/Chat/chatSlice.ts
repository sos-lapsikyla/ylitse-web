import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatFolder } from './models';
import type { Conversation, PollingParam, ChatBuddy } from './mappers';
import { chatApi, extractMostRecentId } from './chatPageApi';
import {
  toNewBuddy,
  mergeMessages,
  getNextParams,
  getParamsForUnreadMessages,
  createBuddyChunks,
} from './mappers';

export type ChatState = {
  showFolders: boolean;
  activeFolder: ChatFolder;
  activeChatId: string | null;
  chats: Record<string, ChatBuddy>;
  pollingParams: Array<PollingParam> | null;
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

  reducers: create => ({
    setShowFolders: create.reducer((state, action: PayloadAction<boolean>) => {
      state.showFolders = action.payload;
    }),

    setActiveFolder: create.reducer(
      (state, action: PayloadAction<ChatFolder>) => {
        state.activeFolder = action.payload;
      },
    ),

    setActiveChat: create.reducer((state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    }),

    clearActiveChat: create.reducer(state => {
      state.activeChatId = null;
    }),

    addPollParam: create.reducer(
      (state, action: PayloadAction<PollingParam>) => {
        const currentParams = state.pollingParams ?? [];
        state.pollingParams = [action.payload, ...currentParams];
      },
    ),

    setConversation: create.reducer(
      (state, action: PayloadAction<Conversation>) => {
        const buddyId = action.payload.buddyId;
        const isConversationExisting = Boolean(state.chats[buddyId]);

        state.activeChatId = buddyId;

        if (!isConversationExisting) {
          state.chats = {
            ...state.chats,
            [buddyId]: toNewBuddy(action.payload),
          };
        }
      },
    ),
  }),

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
          const newOlderThanParams = getParamsForUnreadMessages(
            response.messages,
            rest.pollingParams,
          );
          const nextParams = getNextParams(
            rest.pollingParams,
            mostRecentMessageId,
          );

          return {
            ...rest,
            chats: updatedMessages,
            pollingParams: [...newOlderThanParams, ...nextParams],
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
          const { buddyId, nextStatus } = meta.arg.originalArgs;

          const updatedRecord = {
            ...chats,
            [buddyId]: {
              ...chats[buddyId],
              status: nextStatus,
            },
          };

          return { ...state, chats: updatedRecord };
        },
      );
  },
});

export const {
  setShowFolders,
  setActiveFolder,
  setActiveChat,
  clearActiveChat,
  addPollParam,
  setConversation,
} = chats.actions;
