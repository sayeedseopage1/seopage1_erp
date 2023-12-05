import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { StartTimerWorkingReport } from '../../components/StartTimerWorkingReportPopup'


export const workingReportError = () => {
    withReactContent(Swal).fire({
        icon: 'error',
        html: <StartTimerWorkingReport />,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            confirmButton: 'btn btn-primary py-2 px-4',
            cancelButton: 'btn py-2 px-4 text-white'
        },
    }).then(result => {
        if(result.isConfirmed){
            window.location.reload();
        }
    })
}
