import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuth = create(
  persist(
    (set) => ({
      username: null,
      isLoggedIn: false,
      login: (username) => set({ username, isLoggedIn: true }),
      logout: () => set({ username: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage", // Key for localStorage
    }
  )
);

export default useAuth;
