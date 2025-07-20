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
  WEBSEARCH_ERROR = "WEBSEARCH_ERROR",
  INNGEST_ERROR = "INNGEST_ERROR",
}

export type ParsedSearchResult = {
  type: string;
  title: string;
  url: string;
  img?: string;
  description?: string;
  content?: string;
  source?: string;
  date?: string;
  rating?: number;
  category?: string;
  keyPoints?: string[];
  location?: {
    address?: string;
    coordinates?: number[];
    contact?: string;
    hours?: string;
  };
};

export type InngestRunResponse = {
  run_id: string;
  run_started_at: string;
  function_id: string;
  function_version: number;
  environment_id: string;
  event_id: string;
  status: "Completed" | "Running" | "Cancelled";
  ended_at: string;
  output: {
    status: string;
    processedItems: number;
    failedItems: number;
  };
};
