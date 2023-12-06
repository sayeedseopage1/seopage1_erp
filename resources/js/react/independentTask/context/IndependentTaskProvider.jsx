import * as React from 'react';

export const Ctx = React.createContext(null); // independent task content

// independent task context provider
export default function IndependentTaskProvider({children}){
    const [tableData, setTableData] = React.useState([]);
    const [subTaskTableData, setSubtaskTableData] = React.useState([]);


    // fetch subtask
    const getSubtasksByTaskId = async({taskId, query}) => {
        console.log({taskId, query})
        // getSubTasks({
        //     taskId: data?.id,
        //     query: new URLSearchParams(filter).toString()
        //   })
        //   .unwrap()
        //   .then( res => {
        //     const _data = {...data, subtasks: res?.tasks};
        //     dispatch(addSubtaskToParenttask({id: data?.id, task: _data}));

        //     setLoading(false);
        //     row.toggleExpanded();
        //   })
        //   .catch(err => console.error(err))
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
