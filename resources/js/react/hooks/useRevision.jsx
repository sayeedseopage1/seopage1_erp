import _ from "lodash";



export const useRevision = (task) => {
    const taskType = _.includes([5, 7], task?.category?.id) ? 'design' : 'development';

    // project menager acknowladgement options
    const getProjectManagerAcknowladgementOptions = () =>{

        const isAlreadyAccepted = false;

        if(isAlreadyAccepted){
            return []
        }

        return [
            {
                id: 'PLRx01',
                revision: "My instruction was incomplete/incorrect and I have to make some changes in the instruction now to make it right",
                isDeniable: false,
            },
            {
                id: 'PLRx02',
                revision: "The work done is aligned with my instruction, but after seeing it, I want to give some minor changes",
                isDeniable: false,
            },
            {
                id: 'PLRx3',
                revision: `The Lead ${taskType === 'design' ? 'designer' : 'developer'}/project coordinator’s delivered work doesn’t match my shared requirement`,
                isDeniable: true,
            },
            {
                id: 'PLRx04',
                revision: `The instruction was followed, but the lead ${taskType === 'design' ? 'designer' : 'developer'} missed out some default/basic things or best practices which are not essential to write in instruction`,
                isDeniable: true
            },
            {
                id: 'PLRx05',
                revision: "I have some general revisions",
                isDeniable: false,
                type: 'GENERAL_REVISION'
            }
        ]
    }

    // lead developer acknowladgement Options
    const getLeadDeveloperAcknowladgementOptions = () => { 
        const isAlreadyAccepted = false;
        // if already accepted
        if(isAlreadyAccepted){
            return []
        }else{
            return [
                {
                    id: 'LDRx1',
                    revision: `The concerned ${taskType === 'design' ? 'designer’s' : 'developer’s'}  delivered work doesn’t match my shared requirement`,
                    isDeniable: true,
                },
                {
                    id: 'LDRx2',
                    revision: "My instruction was incomplete/incorrect and I have to make some changes in the instruction now to make it right.",
                    isDeniable: false,
                },
                {
                    id: 'LDRx3',
                    revision: "The work done is aligned with my instruction but after seeing it, I want to give some minor changes.",
                    isDeniable: false
                },

                {
                    id: 'LDRx4',
                    revision: `The instruction was followed but the ${taskType === 'design' ? 'designer' : 'developer'} missed out on some default/basic things or best practices which are not essential to mention in instruction.`,
                    isDeniable: true,
                },
            ]
        }
    }



    return{
        getLeadDeveloperAcknowladgementOptions,
        getProjectManagerAcknowladgementOptions
    }
}
