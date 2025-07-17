import type { ChatInputStore, ChatTabStore } from "@/lib/type";
import { create } from "zustand";

export const useInputChat = create<ChatInputStore>()((set) => ({
  message: undefined,
  setMessage: (message) => set({ message }),
}));

export const useChatTab = create<ChatTabStore>()((set) => ({
  tab: "search",
  setTab: (tab) => set({ tab }),
}));
