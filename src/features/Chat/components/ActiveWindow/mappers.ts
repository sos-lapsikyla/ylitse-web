import type { AppMessage } from '@/features/Chat/models';

type GroupedMessages = Record<string, AppMessage[]>;

export const toGroupedMessages = (messages: Array<AppMessage>) =>
  messages.reduce<GroupedMessages>(
    (grouped: GroupedMessages, current: AppMessage) => {
      const messageDate = new Date(current.created).toLocaleDateString(
        'fi-FI',
        {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        },
      );

      const existingGroup = grouped[messageDate] ?? [];
      const nextMessages = existingGroup.concat(current);

      return { ...grouped, [messageDate]: nextMessages };
    },
    {},
  );
