import { create } from "zustand";

// Define your Zustand store
const useCounterStore = create((set) => ({
    count: 0,

    increaseCount: () => {
        set((state) => ({ count: state.count + 1 }));
    },
}));

export default useCounterStore;
