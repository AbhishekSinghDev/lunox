import type { InngestIdStore } from "@/lib/type";
import { create } from "zustand";

export const useInngestId = create<InngestIdStore>()((set) => ({
  inngestId: null,
  setInngestId: (id) => set({ inngestId: id }),
}));
