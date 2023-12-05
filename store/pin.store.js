import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      setUserData: (data) => set({ user: data }),
    }),
    {
      name: "user-storage", // unique name
    }
  )
);

export default useUserStore;
