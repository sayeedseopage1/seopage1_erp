import { create } from "zustand";

const useEmployeeEvaluation = create((set) => ({
    evaluationObject: {},
    setEvaluationObject: (object) => {
        console.log("Setting evaluation object:", object);
        set({ evaluationObject: object });
    },
}));

export default useEmployeeEvaluation;
