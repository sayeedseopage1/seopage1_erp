import React from "react";
import DisputeTable from "./components/DisputeTable";
import { disputeTableColumn } from "./components/diputeTableColumn";
import DataTable from "../global/table/DataTable";
import FilterContainer from './components/Filter-bar/FilterContainer';
import Filterbar from "./components/Filter-bar/Filterbar";

const Disputes = () => {

    const onFilter = (filter) => {
        console.log(filter)
    }

    return (
        <React.Fragment>

            <FilterContainer>
                <Filterbar onFilter={onFilter} /> 
            </FilterContainer>

            <div className="py-2 py-md-4 px-2 px-md-5 w-full">
                {/* card section */}
                <div className="row">
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}

                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                </div>

                {/* disputes table */}
                <div className="mt-3 p-3 bg-white">
                    <DataTable
                        tableData={[{ id: 1 }, { id: 2 }]}
                        tableColumns={disputeTableColumn}
                        hideColumns={[]}
                        search={""}
                        filter={""}
                        tableName="dispute-table"
                        isLoading={false}
                        state={null}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Disputes;
