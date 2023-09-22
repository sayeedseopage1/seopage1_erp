import React, { useState, useEffect } from "react";
import { projectElaborationData } from "./faker";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";
import Modal from "../global/Modal";
import Button from "../global/Button";
import DataTable from "../global/data-table/table";
import { useLazyGetRevisionCalculatorDataTotalDisputeQuery } from "../services/api/revisionCalculatorApiSlice";

import { TotalDisputeTableColumn } from "./TotalDisputeTableColumns";

// const data = projectElaborationData(50);

const TotalDisputeTable = () => {
    const [data, setData] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [nRows, setNRows] = useState(10);
    const navigation = useNavigate();
    const [searchParams] = useSearchParams();

    const pm_id = searchParams.get("pm");
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");
    const filter = { pm_id, start_date, end_date };

    const goBack = () => navigation(`/`);

    const [getRevisionCalculatorDataTotalDispute, { isFetching }] =
        useLazyGetRevisionCalculatorDataTotalDisputeQuery();

    // fetch data
    useEffect(() => {
        (async () => {
            const queryObject = _.pickBy(filter, Boolean);
            const queryString = new URLSearchParams(queryObject).toString();

            try {
                let res = await getRevisionCalculatorDataTotalDispute(
                    `/${pm_id}?${queryString}`
                ).unwrap();
                const arr = [];
                _.forEach(res.total_disputes, (d) => {
                    arr.push({
                        ...d,
                        uid: Math.random().toString(36).substr(2, 5),
                    });
                });

                setData(arr);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <Modal isOpen={true}>
            <div className="sp1_modal-content-wrapper">
                <div className={`sp1_modal-panel ${styles.modal_panel}`}>
                    {/* header */}
                    <div className={`sp1_modal-head ${styles.modal_title_bar}`}>
                        <div className="sp1_modal-title pl-2">
                            Total Dispute Table
                        </div>
                        <Button
                            onClick={goBack}
                            aria-label="ModalClose"
                            variant="tertiary"
                            className="sp1_modal-close"
                        >
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>
                    {/* end header */}

                    {/* body */}
                    <div className={`sp1_modal-body ${styles.modal_body}`}>
                        <DataTable
                            data={data}
                            margeRow={true}
                            tableName="RevisionTotalDisputeTableColumns"
                            columns={TotalDisputeTableColumn}
                            pageIndex={pageIndex}
                            perPageRow={nRows}
                            onPageChange={(value) => setPageIndex(value)}
                            onPageRowChange={(n) => setNRows(n)}
                            total={data.length}
                            isLoading={isFetching}
                            uniq_id="uid"
                            tableClass={styles.table}
                            groupBy={(data) =>
                                _.groupBy(data, (d) => d.projectId)
                            }
                            tableContainerClass={styles.tableContainer}
                        />
                    </div>
                    {/* end body */}
                </div>
            </div>
        </Modal>
    );
};

export default TotalDisputeTable;
