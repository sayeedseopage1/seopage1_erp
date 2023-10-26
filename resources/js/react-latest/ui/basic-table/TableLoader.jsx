import { Placeholder } from "../Placeholder";

const TableLoader = ({columns}) => {
    return(
        _.times(10,item=>(
           <tr key={item} className="sp1-data-table-tr">
            {_.map(columns, col => (
                <td key={col.id} className="sp1-data-table-td">
                    <Placeholder  />
                </td>
            ))}
           </tr>
        ) )
    )
}

export default TableLoader;
