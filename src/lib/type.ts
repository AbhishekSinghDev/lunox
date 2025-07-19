import type { THREAD_DETAILS_TABS } from "./constants";

export type ChatInputStore = {
  message: string | undefined;
  setMessage: (message: string | undefined) => void;
};

export type ChatType = "search" | "research";

export type ChatTypeStore = {
  type: ChatType;
  setType: (type: ChatType) => void;
};

export type ActiveTab = (typeof THREAD_DETAILS_TABS)[number]["title"];

export type ActiveTabStore = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

export enum Error {
  SERVER_ERROR = "SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
  DATABASE_ERROR = "DATABASE_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
}
