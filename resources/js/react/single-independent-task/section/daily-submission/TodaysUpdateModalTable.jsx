import { useState } from "react";
import TodaysUpdateModalTableRow from "./TodaysUpdateModalTableRow";
import style from "./styles/DailySubmission.module.css";
import "./styles/DataTable.css";
import { useGetDailySubmissionQuery } from "../../../services/api/dailySubmissionApiSlice";
import { useSearchParams } from "react-router-dom";
import { User } from "../../../utils/user-details";
import dayjs from "dayjs";

const TodaysUpdateModalTable = () => {
    const [open, setOpen] = useState(null);
    const [searchParams] = useSearchParams();
    const date_type = searchParams.get("data_type");

    const loggedUser = new User(window.Laravel?.user);

    const today = dayjs().format('YYYY-MM-DD');

    const { data, isLoading, refetch } = useGetDailySubmissionQuery(
        `${loggedUser?.id}?date_type=${today}`
    ); 
     

    return (
        <div className={`sp1_tlr_tbl_wrapper`} style={{ overflow: "auto" }}>
            <table className={`sp1_tlr_table`} style={{ minWidth: "0" }}>
                <thead>
                    <tr className={``}>
                        <th className={`sp1_tlr_th`}>SL No.</th>
                        <th className={`sp1_tlr_th`}>Task Name</th>
                        <th className={`sp1_tlr_th`}>Page Link</th>
                        <th className={`sp1_tlr_th`}>
                            Total Time Spend on This Task Today
                        </th>
                        <th className={`sp1_tlr_th`}>Client Name</th>
                        <th className={`sp1_tlr_th`} style={{ width: "10rem" }}>
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className={`sp1_tlr_tbody`}>
                    {/* {
                        (isLoading ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : data?.data).filter((d) => !d.daily_submission_status).map((d, i) => <TodaysUpdateModalTableRow data={d} key={i} index={i} open={open} setOpen={setOpen} loading={isLoading} />)
                    } */}
                    {(isLoading
                        ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                        : data?.data
                    ).map((d, i) => (
                        <TodaysUpdateModalTableRow
                            data={d}
                            date={data?.date}
                            key={i}
                            index={i}
                            open={open}
                            setOpen={setOpen}
                            loading={isLoading}
                            refetch={refetch}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodaysUpdateModalTable;
