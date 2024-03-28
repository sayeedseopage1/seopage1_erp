import { create } from "zustand";
// Create a Zustand store
export const useCommentStore = create((set) => ({
    refetchComment: 0,
    // Function to increase refetchComment by 1
    increaseRefetchComment: () =>
        set((state) => ({ refetchComment: state.refetchComment })),
    // set((state) => ({ refetchComment: state.refetchComment + 1 })),
}));
