import { UserInfo } from "firebase/auth";
import { create } from "zustand";

type AuthType = {
  userInfo: UserInfo | null,
  actions: {
    setUserInfo: (v: UserInfo | null) => void,
  }
};

const useAuthStore = create<AuthType | null>((set) => ({
  userInfo: null,
  actions: {
    setUserInfo: (v: UserInfo | null) => set({ userInfo: v })
  }
}));

export default useAuthStore;