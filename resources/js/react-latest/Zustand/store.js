import { create } from "zustand";

// Define your Zustand store
const useCounterStore = create((set) => ({
    count: 0,

    increaseCount: () => {
        set((state) => ({ count: state.count + 1 }));
    },
}));

export const useUserStore = create((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
}));
export default useCounterStore;
