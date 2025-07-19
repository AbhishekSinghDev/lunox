import type { ActiveTabStore } from "@/lib/type";
import { create } from "zustand";

export const useActiveTab = create<ActiveTabStore>()((set) => ({
  activeTab: "Answer",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
