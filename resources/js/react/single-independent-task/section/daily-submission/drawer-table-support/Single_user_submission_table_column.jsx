import { convertTime } from "../../../../utils/converTime";

const timeFormatter = (time = '') => {
    // console.log(time);
    const [year, month, date] = time.split(" ")[0].split("-");
    let month_name = '';
    switch (month) {
        case '01':
            month_name = "Jan";
            break;

        case '02':
            month_name = "Feb";
            break;

        case '03':
            month_name = "Mar";
            break;

        case '04':
            month_name = "Apr";
            break;

        case '05':
            month_name = "May";
            break;

        case '06':
            month_name = "Jun";
            break;

        case '07':
            month_name = "Jul";
            break;

        case '08':
            month_name = "Aug";
            break;

        case '09':
            month_name = "Sep";
            break;

        case '10':
            month_name = "Oct";
            break;

        case '11':
            month_name = "Nov";
            break;

        case '12':
            month_name = "Dec";
            break;

        default:
            break;
    }
    return `${month_name} ${date}, ${year}`
}


export const columnSchema = [
    {
        id: 'report_date',
        header: 'Report Date',
        draggable: true,
        // accessor: 'report_date',
        accessorKey: 'submission_creation_date',
        cell: (cell) => (
            <div style={{ padding: '0 0.5rem' }}>
                {timeFormatter(cell.getValue())}
            </div>
        )
    },
    {
        id: 'page_link',
        header: 'Page Link',
        draggable: true,
        // accessor: 'page_link',
        accessorKey: 'link_name',
        cell: (cell) => (
            <div style={{ padding: '0 0.5rem' }}>
                <a href={cell.getValue()} target="_blank">
                View Link
                </a>
            </div>
        )
    },
    {
        id: 'sections',
        header: 'Sections',
        draggable: true,
        // accessor: 'sections',
        accessorKey: 'section_name',
        cell: (cell) => (
            <div style={{ padding: '0 0.5rem' }}>
                {cell.getValue()}
            </div>
        )
    },
    {
        id: 'comment',
        header: 'Comment',
        draggable: true,
        // accessor: 'comment',
        accessorKey: 'comment',
        cell: (cell) => (
            <div style={{ minWidth: '20rem', maxWidth: '20rem', width: '100%' }} dangerouslySetInnerHTML={{__html:cell.getValue()}}/>
        )
    },
    {
        id: 'total_time_spent',
        header: 'Total Time Spent',
        draggable: true,
        // accessor: 'total_time_spent',
        accessorKey: 'hours_spent',
        cell: (cell) => (
            <div style={{ padding: '0 0.5rem' }}>
                {convertTime(cell.getValue())}
            </div>
        )
    },
    {
        id: 'attachment_url',
        header: 'Screenshots/Screen records of the sections',
        draggable: true,
        // accessor: 'attachment_url',
        accessorKey: 'attachments',
        cell: (cell) => (
            <div style={{ padding: '0 0.5rem' }}>
                <a href={cell.getValue()} target="_blank"></a>
                View Link
            </div>
        )
    },
    {
        id: 'site_url',
        header: `Working/Staging Site's URL`,
        draggable: true,
        // accessor: 'site_url',
        accessorKey: 'site_url',
        cell: (cell) => (
            <div style={{ padding: '0 0.5rem' }}>
                <a href={cell.getValue()} target="_blank">
                    View Link
                </a>
            </div>
        )
    },
    {
        id: 'frontend_password',
        header: 'Frontend Password',
        draggable: true,
        // accessor: 'frontend_password',
        accessorKey: 'frontend_password',
        cell: (cell) => (
            <div style={{ padding: '0 0.5rem' }}>
                {cell.getValue()?cell.getValue():'No Password'}
            </div>
        )
    },
    {
        id: 'submission_date',
        header: 'Report Submission Date',
        draggable: true,
        // accessor: 'submission_date',
        accessorKey: 'submission_creation_date',
        cell: (cell) => (
            <div style={{ padding: '0 0.5rem' }}>
                {timeFormatter(cell.getValue())}
            </div>
        )
    }
]