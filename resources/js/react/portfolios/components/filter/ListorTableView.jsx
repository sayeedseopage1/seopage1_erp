import React from "react";
import Button from "../../../global/Button";

const ListOrTableView = ({ tableView, setTableView }) => {
    return (
        <div className="list-table-toggle">
            <Button
                variant={tableView === "tableView" ? "primary" : "secondary"}
                onClick={() => setTableView("tableView")}
            >
                Table View
            </Button>
            <Button
                variant={tableView === "listView" ? "primary" : "secondary"}
                onClick={() => setTableView("listView")}
            >
                List View
            </Button>
        </div>
    );
};

export default ListOrTableView;
