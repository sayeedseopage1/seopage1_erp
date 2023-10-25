import React from "react"; 
import {Placeholder} from '../../../global/Placeholder';

const GenarelLoader = () => { 
    return (
        <div className="row">
            <div className="col-12 col-xl-6 pb-3 pb-xl-0">
                <div className="d-flex flex-column" style={{ gap: "10px" }}>
                    <h6 className="">
                       <Placeholder width="220px" />
                    </h6> 
                    <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">
                            <Placeholder width="80px" />
                        </div>
                        <div className="sp1_st-list-item-value">
                            <Placeholder width="220px" /> 
                        </div>
                    </div> 

                    {/* <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">
                            <Placeholder width="80px" />
                        </div>
                        <div className="sp1_st-list-item-value">
                            <Placeholder width="220px" />
                        </div>
                    </div> */}

                    {/* <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">
                            <Placeholder width="80px" />
                        </div>
                        <div className="sp1_st-list-item-value">
                            <Placeholder width="220px" />
                        </div>
                    </div> */}

                    {/* asignee to */}
                    <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">
                            <Placeholder width="80px" />
                        </div>
                        <div className="sp1_st-list-item-value">
                            <div style={{ width: "32px", height: "32px" }}>
                                <Placeholder
                                    width="32px"
                                    height="32px"
                                    type="circle"
                                    className="rounded-circle"
                                />
                            </div>
                            <div className="ml-2">
                                <Placeholder width="130px" /> 
                                <Placeholder width="70px" height="10px" className="mt-2" /> 
                            </div>
                        </div>
                    </div>

                    {/* assignee by */}
                    <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">
                            <Placeholder width="80px" />
                        </div>
                        <div className="sp1_st-list-item-value">
                            <div style={{ width: "32px", height: "32px" }}>
                                <Placeholder
                                    width="32px"
                                    height="32px"
                                    type="circle"
                                    className="rounded-circle"
                                />
                            </div>
                            <div className="ml-2">
                                <Placeholder width="130px" /> 
                                <Placeholder width="70px" height="10px" className="mt-2" /> 
                            </div>
                        </div>
                    </div>

                    {/* PRIORITY */}

                    <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">
                            <Placeholder width="80px" />
                        </div>
                        <div className="sp1_st-list-item-value">
                            <Placeholder width="80px" />
                        </div>
                    </div>

                    {/* category */}
                    <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">
                            <Placeholder width="80px" />
                        </div>
                        <div className="sp1_st-list-item-value">
                            <Placeholder width="100px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenarelLoader;
