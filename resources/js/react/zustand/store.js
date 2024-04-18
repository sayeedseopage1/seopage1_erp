import { create } from "zustand";

const useEmployeeEvaluation = create((set) => ({
    evaluationObject: {},
    setEvaluationObject: (object) => {
        set({ evaluationObject: object });
    },
}));

export default useEmployeeEvaluation;
