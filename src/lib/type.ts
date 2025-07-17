export type ChatInputStore = {
  message: string | undefined;
  setMessage: (message: string) => void;
};

export type ChatTab = "search" | "research";

export type ChatTabStore = {
  tab: ChatTab;
  setTab: (tab: ChatTab) => void;
};
