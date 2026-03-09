import { Message } from '../models';

export const toGroupedReportMessages = (messages: Message[]) =>
  messages.reduce<Record<string, Message[]>>((acc, msg) => {
    const date = new Date(msg.created).toLocaleDateString('fi-FI');
    acc[date] ??= [];
    acc[date].push(msg);
    return acc;
  }, {});
