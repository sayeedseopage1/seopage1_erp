import { create } from "zustand";

const useCounterStore = create((set) => ({
    count: 0,

    increaseCount: () => {
        set((state) => ({ count: state.count + 1 }));
    },
}));

export const usePendingActionStore = create((set) => ({
    pendingAction: {},
    setPendingAction: (obj) => {
        set({ pendingAction: obj });
        localStorage.setItem("selectedPendingAction", JSON.stringify(obj));
    },
}));

export default useCounterStore;
