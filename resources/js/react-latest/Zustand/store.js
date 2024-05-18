import { create } from "zustand";

const useCounterStore = create((set) => ({
    count: 0,

    increaseCount: () => {
        set((state) => ({ count: state.count + 1 }));
    },
}));

<<<<<<< HEAD:resources/js/react-latest/components/Zustand/store.js
export const usePendingActionStore = create((set) => ({
    pendingAction: {},
    setPendingAction: (obj) => {
        set({ pendingAction: obj });
        localStorage.setItem("selectedPendingAction", JSON.stringify(obj));
    },
}));

=======
export const useUserStore = create((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
}));
>>>>>>> 0573b9797f70c89cd4c14893270cdb4623738f52:resources/js/react-latest/Zustand/store.js
export default useCounterStore;
