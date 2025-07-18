import type { ChatInputStore, ChatTypeStore } from "@/lib/type";
import { create } from "zustand";

export const useInputChat = create<ChatInputStore>()((set) => ({
  message: undefined,
  setMessage: (message) => set({ message }),
}));

export const useChatType = create<ChatTypeStore>()((set) => ({
  type: "search",
  setType: (type) => set({ type }),
}));
