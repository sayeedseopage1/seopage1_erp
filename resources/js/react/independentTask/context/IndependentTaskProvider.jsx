import * as React from 'react';
import { useGetIndependentSubtaskByTaskIdMutation } from '../../services/api/independentTaskApiSlice';

export const Ctx = React.createContext(null); // independent task content

// independent task context provider
export default function IndependentTaskProvider({children}){
    const [tableData, setTableData] = React.useState([]);
    const [subTaskTableData, setSubtaskTableData] = React.useState([]);

    const [getIndependentSubtaskByTaskId] = useGetIndependentSubtaskByTaskIdMutation();



    // fetch subtask
    const getSubtasksByTaskId = async({taskId, query}) => {
        try {
            const res = await getIndependentSubtaskByTaskId({taskId, query}).unwrap();
            if(res && res.data){
                const _tableData = [...tableData];
                const newTableData = _tableData.map(d => {
                    if(d.id === taskId){
                        return {...d, subtasks: [...res.data]}
                    }
                    return d;
                })

                setTableData(newTableData);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return(
        <Ctx.Provider
            value={{
                tableData,
                setTableData,
                getSubtasksByTaskId,
                subTaskTableData,
                setSubtaskTableData,
            }}
        >
            {children}
        </Ctx.Provider>
    )
}



// independent task context hook
export const useIndependentTask = () => React.useContext(Ctx);
