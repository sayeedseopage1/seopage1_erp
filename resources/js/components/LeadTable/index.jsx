import React from "react";
import ReactDOM from "react-dom/client";
import Table from "../Table";
import { LeadTableColumnsHead } from "./LeadTableColumnsHead";

const LeadTable = (props) => {
    const [data, setData] = React.useState([]);
    console.log(props);

    React.useEffect(() => {
        if (data.length === 0) {
            (async () => {
                (async () => {
                    const response = await fetch(
                        "https://seopage1erp.website/api/leads"
                    );
                    const data = await response.json();
                    setData(data.data);
                })();
            })();
        }
    }, []);

    return (
        <div>
            <Table data={data} columns={LeadTableColumnsHead} />
        </div>
    );
};
export default LeadTable;
// const rootContainer = document.getElementById("react-lead-table");
// if (rootContainer) {
//     const root = ReactDOM.createRoot(rootContainer);

//     root.render(
//         <React.StrictMode>
//             <LeadTable />
//         </React.StrictMode>
//     );
// }
