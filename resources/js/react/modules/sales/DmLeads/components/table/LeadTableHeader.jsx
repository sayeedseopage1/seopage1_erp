import * as React from 'react';
import { 
  TableHead,
  TableRow, 
} from './ui'
import TableHeaderItem from './TableHeaderItem';



const LeadTableHeader = ({table, columns}) => {
  return(
    <TableHead>
      {
        table.getHeaderGroups().map(headerGroup => (
          <TableRow
            key={headerGroup.id}
          >
            {headerGroup.headers.map(header => (
              <TableHeaderItem
                key={header.id}
                header={header}
                table={table}
              />
            ))}
          </TableRow>
        ))
      }
    </TableHead>
  )
}

export default LeadTableHeader;