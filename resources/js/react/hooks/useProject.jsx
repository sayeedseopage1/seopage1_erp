import * as React from "react";
import { useSelector } from "react-redux";
import {
    useLazyCheckPMTaskGuidelineQuery,
    useLazyGetProjectDeliverableStatusQuery,
} from "../services/api/projectApiSlice";

export const useProject = () => {
    const { tasks, subtasks } = useSelector((s) => s.tasks);
    const [deliverableStatus, setDeliverableStatus] = React.useState(false);
    const [projectGuidelineStatus, setProjectGuidelineStatus] =
        React.useState(false);

    // get project guideline status
    // query call
    const [
        checkPMTaskGuideline,
        { isFetching: projectGuidelineStatusIsLoading },
    ] = useLazyCheckPMTaskGuidelineQuery();

    // project guideline status function
    const getProjectGuidelineStaus = async (projectId) => {
        try {
            if (projectGuidelineStatus === true) return true;
    
            const res = await checkPMTaskGuideline(projectId).unwrap();
    
            if (res?.status === 200) {
                setProjectGuidelineStatus(true);
                return true; // Project guideline status is true
            }
    
            return false; // Project guideline status is false
        } catch (error) {
            console.error(error);
            return false; // Handle errors and assume project guideline status is false
        }
    };

    // deliverable status
    const [
        getProjectDeliverableStatus,
        { isFetching: projectDeliverableStatusIsLoading },
    ] = useLazyGetProjectDeliverableStatusQuery();

    // get deliverable status function
    const isDeliverable = async (projectId) => {
        try {
            const res = await getProjectDeliverableStatus(projectId).unwrap();

            if (res?.status === 400) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: res.message,
                    showConfirmButton: true,
                });
                return false; // Project is not deliverable
            }

            if (res?.status === 200) {
                setDeliverableStatus(true);
                return true; // Project is deliverable
            }

            return false; // Default to not deliverable if response status is not handled
        } catch (err) {
            console.log(err);
            return false; // Handle any errors and assume project is not deliverable
        }
    };

    return {
        tasks,
        subtasks,
        isDeliverable,
        getProjectGuidelineStaus,
        projectGuidelineStatusIsLoading,
        projectDeliverableStatusIsLoading,
    };
};
