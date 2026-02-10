import * as D from 'io-ts/Decoder';

const status = D.literal('handled', 'received');

const reportCodec = D.struct({
  active: D.boolean,
  contact_field: D.string,
  created: D.string,
  id: D.string,
  report_reason: D.string,
  reporter_user_id: D.string,
  reported_user_id: D.string,
  status: status,
  updated: D.string,
});
export type ApiReport = D.TypeOf<typeof reportCodec>;

export const reportListResponseType = D.struct({
  resources: D.array(reportCodec),
});

type ReportsResponse = D.TypeOf<typeof reportListResponseType>;

export type Report = ReturnType<typeof toReport>;

const toReport = ({
  id,
  created,
  contact_field,
  report_reason,
  reported_user_id,
  reporter_user_id,
  status,
  updated,
}: ApiReport) => ({
  id,
  created,
  contactField: contact_field,
  reportReason: report_reason,
  reportedUserId: reported_user_id,
  reporterUserId: reporter_user_id,
  status,
  updated,
});

export type Reports = Record<string, Report>;

export const toReportMap = ({ resources }: ReportsResponse): Reports =>
  resources.reduce<Reports>((acc, apiReport) => {
    const report = toReport(apiReport);
    acc[report.id] = report;
    return acc;
  }, {});

export type UpdateReportPayload = {
  id: string;
  body: Partial<ApiReport> & { comment: string };
};

export const messageResourceCodec = D.struct({
  id: D.string,
  sender_id: D.string,
  recipient_id: D.string,
  opened: D.boolean,
  active: D.boolean,
  created: D.string,
  updated: D.string,
  content: D.string,
});

export type ApiMessage = D.TypeOf<typeof messageResourceCodec>;

const contactRole = D.literal('admin', 'mentee', 'mentor');

export const contactResourceCodec = D.struct({
  id: D.string,
  display_name: D.string,
  role: contactRole,
  account_id: D.string,
  active: D.boolean,
  created: D.string,
  updated: D.string,
});

export type ApiContact = D.TypeOf<typeof contactResourceCodec>;

export const messagesResponseCodec = D.struct({
  resources: D.array(messageResourceCodec),
  contacts: D.array(contactResourceCodec),
});

export type MessageResponse = D.TypeOf<typeof messagesResponseCodec>;

export type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  opened: boolean;
  created: string;
  updated: string;
};

export type ContactRole = D.TypeOf<typeof contactRole>;

export type Contact = {
  id: string;
  displayName: string;
  role: ContactRole;
};

export const toMessage = ({
  id,
  sender_id,
  recipient_id,
  content,
  opened,
  created,
  updated,
}: ApiMessage): Message => ({
  id,
  senderId: sender_id,
  recipientId: recipient_id,
  content,
  opened,
  created,
  updated,
});

export const toContact = ({ id, display_name, role }: ApiContact): Contact => ({
  id,
  displayName: display_name,
  role,
});

export type Messages = Record<string, Message>;

export const toMessageMap = ({ resources }: MessageResponse): Messages =>
  resources.reduce<Messages>((acc, apiMessage) => {
    const message = toMessage(apiMessage);
    acc[message.id] = message;
    return acc;
  }, {});

export type Contacts = Record<string, Contact>;

export const toContactMap = ({ contacts }: MessageResponse): Contacts =>
  contacts.reduce<Contacts>((acc, apiContact) => {
    const contact = toContact(apiContact);
    acc[contact.id] = contact;
    return acc;
  }, {});

export type ReportMessagesResult = {
  messages: Messages;
  contacts: Contacts;
};
