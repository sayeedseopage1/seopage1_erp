import * as React from "react";
import { columns as defaultColumns } from "./Columns";
import _ from "lodash";
import { QualifiedSalesContext } from "../context";
import DragableHeader from "./DragableHeader";
import Pagination from "../../Points/ui/Pagination";

const QualifiedSalesTable = ({
    data = [],
    users = [],
    usersObject,
    isLoading = true,
}) => {
    const [currentPageData, setCurrentPageData] = React.useState([]);
    const {
        columns,
        sortConfig,
        setColumns,
        setSortConfig,
        activePage,
        setActivePage,
        parPageRow,
        setParPageRow,
    } = React.useContext(QualifiedSalesContext);

    React.useEffect(() => {
        let _columns = defaultColumns;
        let lsColumn = localStorage.getItem(
            `qualifiedSalesTable_${window?.Laravel?.user?.id}`
        );

        // //  // sort by lsColumn

        // // //  const columns = _columns.filter(d => activeColumns.includes(d.id))
        // // //             .sort((a, b) => activeColumns.indexOf(a.id) - activeColumns.indexOf(b.id))

        if (lsColumn) {
            lsColumn = JSON.parse(lsColumn);
            _columns = _columns.sort(
                (a, b) =>
                    lsColumn.findIndex((d) => d.id === a.id) -
                    lsColumn.findIndex((d) => d.id === b.id)
            );
        }

        // console.log({_columns})

        setColumns([..._columns]);
    }, []);

    // // initial state
    // React.useEffect(() => {
    //     setColumns([...defaultColumns]);
    // }, []);

    // config sort
    const sortedData = (data, sortConfig) => {
        if (sortConfig.key) {
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        return data;
    };

    // sort request
    const requestSort = (key) => {
        let direction = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        } else direction = "asc";

        setSortConfig({ key, direction });
    };

    const getUser = (id) => {
        if (usersObject && !_.isEmpty(usersObject)) {
            id = Number(id);
            return usersObject[id];
        } else return {};
    };

    return (
        <>
            <div className="w-100 bg-white p-3 rounded sp1_qs_tbl_container">
                <div
                    className="bg-white"
                    style={{
                        maxHeight: `calc(100vh - 280px)`,
                    }}
                >
                    <div className="sp1_qs_table">
                        {/* head */}
                        <div className="sp1_qs_table_tr">
                            {columns?.map((column) => {
                                return (
                                    <DragableHeader
                                        key={column.id}
                                        column={column}
                                        columns={columns}
                                        setColumns={setColumns}
                                        sortConfig={sortConfig}
                                        requestSort={requestSort}
                                    />
                                );
                            })}
                        </div>

                        {/* body */}
                        {/* head */}
                        {isLoading
                            ? [...Array(parPageRow)].map((_, i) => (
                                  <div key={i} className="sp1_qs_table_tr">
                                      {columns?.map((column) => {
                                          return (
                                              <div
                                                  key={column.id}
                                                  className={`sp1_qs_table_td sp1_qs_table_td_${column.id} ${column?.headClass}`}
                                              >
                                                  {column?.cell({}, isLoading)}
                                              </div>
                                          );
                                      })}
                                  </div>
                              ))
                            : currentPageData?.map((row) => (
                                  <div
                                      key={row?.id}
                                      className="sp1_qs_table_tr"
                                  >
                                      {columns?.map((column) => {
                                          return (
                                              <div
                                                  key={column.id}
                                                  className={`sp1_qs_table_td sp1_qs_table_td_${
                                                      column.id
                                                  } ${column?.headClass || ""}`}
                                              >
                                                  {column?.cell(
                                                      {
                                                          ...row,
                                                          salesLead: getUser(
                                                              row[
                                                                  "sales_lead_id"
                                                              ]
                                                          ),
                                                          admin: getUser(
                                                              row["admin_id"]
                                                          ),
                                                      },
                                                      isLoading
                                                  )}
                                              </div>
                                          );
                                      })}
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
            <div className="cnx__table_footer">
                <div className="__show_entries">
                    <span>Show</span>
                    <select
                        className="py-2 border"
                        onChange={(e) => setParPageRow(Number(e.target.value))}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>

                    <span>entries</span>
                </div>

                <div className="__total_entries">
                    Showing {currentPageData.length > 0 ? 1 : 0} to{" "}
                    {currentPageData.length} of {data.length} entries
                </div>

                {/* pagination */}
                <Pagination
                    sortConfig={sortConfig}
                    sortedData={sortedData}
                    data={data}
                    currentPage={activePage}
                    setCurrentPage={setActivePage}
                    setCurrentPageData={(v) => setCurrentPageData(v)}
                    numOfPerPageRow={Number(parPageRow)}
                />
                {/* end pagination */}
            </div>
        </>
    );
};

export default QualifiedSalesTable;
