import { EmployeeWiseTableColumns } from "./EmployeeTableColumns";
import DataTable from "./Table";
import LeadTable from "../LeadTable";
import { fakeData } from "./fakeData";

const EmployeeWiseTable = () => {
    return (
        <div>
            <DataTable data={fakeData} columns={EmployeeWiseTableColumns} />
        </div>
    );
};

export default EmployeeWiseTable;
