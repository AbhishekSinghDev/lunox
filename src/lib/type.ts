export type ChatInputStore = {
  message: string | undefined;
  setMessage: (message: string) => void;
};

export type ChatType = "search" | "research";

export type ChatTypeStore = {
  type: ChatType;
  setType: (type: ChatType) => void;
};
