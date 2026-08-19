export type NotificationType = "BREAKING" | "SYSTEM" | "COMMENT" | "ACCOUNT";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  href?: string;
  isRead: boolean;
  createdAt: string;
}
