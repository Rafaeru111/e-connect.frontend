import { create } from "zustand";

const useAuthStore = create((set) => ({
  loggedIn: false,
  setLoggedIn: () => set({ loggedIn: true }),
  setLoggedOut: () => set({ loggedIn: false }),
}));

export default useAuthStore;
