import { create } from "zustand";
// Create a Zustand store
export const useCommentStore = create((set) => ({
    allComments: [],
    setAllComments: (comments) => set({ allComments: comments }),
}));
