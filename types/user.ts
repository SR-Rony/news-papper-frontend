export type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "REPORTER" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  locale: "en" | "bn";
  emailNotifications: boolean;
  breakingNewsAlerts: boolean;
}
