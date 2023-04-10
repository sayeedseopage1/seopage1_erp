import { EmployeeWiseTableColumns } from "./EmployeeTableColumns";
import DataTable from "./Table";
import React from "react";

const EmployeeWiseTable = () => {
    const [data, setData] = React.useState([]);


    React.useEffect(() => {
        if (data.length > 0) return;
        const fetch = async () => {
            const res = await axios.get('/get-timelogs');
            console.log(res.data)
            setData(res.data)

        }
        fetch();
        return () => fetch()
    }, [])


    return (
        <div>
            <DataTable data={data} columns={EmployeeWiseTableColumns} />
        </div>
    );
};

export default EmployeeWiseTable;
