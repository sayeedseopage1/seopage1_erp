import React from "react";
import PropTypes from "prop-types";

// Style
import "./style/viewPriceQuotationsInvoice.css";
import dayjs from "dayjs";

const ViewPriceQuotationsInvoice = ({ invoiceData, targetRef }) => {
    return (
        <div ref={targetRef} className="view_price_quotations_invoice_wrapper">
            <div className="view_price_quotations_invoice_header">
                <img
                    src={
                        require("../../../../../../../../../public/images/SEOPage1_logo 1.png")
                            .default
                    }
                    alt="seopage1-logo"
                />
                <h1>Price Quotation</h1>
            </div>
            <div className="view_price_quotations_invoice_provider">
                <div className="view_price_quotations_invoice_provider_left">
                    <h6>Service Provider:</h6>
                    <div>
                        <p>Seopage1</p>
                        <span>Rajat Chakraborty</span>
                        <span>User Id: Rajat C.</span>
                    </div>
                </div>
                <div className="view_price_quotations_invoice_provider_right">
                    <table>
                        <tbody>
                            <tr>
                                <td>Serial No:</td>
                                <td>SEOPAGE1-P.I-24-031</td>
                            </tr>
                            <tr>
                                <td>Date:</td>
                                <td>
                                    {dayjs(new Date()).format("DD.MM.YYYY")}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="view_price_quotations_invoice_provider">
                <div className="view_price_quotations_invoice_provider_left">
                    <h6>Client/Bill to:</h6>
                    <div>
                        <p>{invoiceData?.client?.name}</p>
                        <span>User Id: {invoiceData?.client?.user_id}</span>
                        <span>
                            Message Thread:{" "}
                            <a href={invoiceData?.client?.message_thread}>
                                {invoiceData?.client?.message_thread}
                            </a>
                        </span>
                    </div>
                </div>
                <div className="view_price_quotations_invoice_provider_right_deadline">
                    <h6>Deadline:</h6>
                    <p>{invoiceData?.deadline}</p>
                </div>
            </div>
            <div className="view_price_quotations_invoice_table_wrapper">
                <table className="view_price_quotations_invoice_table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Items</th>
                            <th>Quantity</th>
                            <th>Descriptions</th>
                            <th>Total Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData?.items?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.items}</td>
                                <td>{item.quantity}</td>
                                <td>{item.descriptions}</td>
                                <td>{item.total_hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <div className="view_price_quotations_invoice_footer">
                    <div className="view_price_quotations_invoice_footer_top">
                        <p>
                            Total hours needed:{" "}
                            <span>{invoiceData?.total_hours} hours</span>
                        </p>
                        <p>
                            Total price :
                            <span> System suggested price price plus 10%</span>
                        </p>
                    </div>
                    <div className="view_price_quotations_invoice_footer_bottom">
                        <p>
                            Note: This quotation is valid for the next 24 hours.
                        </p>
                        <span>
                            If you have any questions concerning this quotation,
                            please feel free to contact.{" "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPriceQuotationsInvoice;

ViewPriceQuotationsInvoice.propTypes = {
    invoiceData: PropTypes.object.isRequired,
};
