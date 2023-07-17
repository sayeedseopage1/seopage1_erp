import { Link } from "react-router-dom"

const Note = ({note}) => {
  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item">
        <div className='w-100 text-ellipsis'>
          {note?.title || 'Untitled'} 
        </div>

        <div className="d-flex align-items-center">
            <Link to={`?note=${note.id}&type=view`} className="mr-2 py-2 sp1_task_righ_action_btn">
              <i className="fa-regular fa-eye"></i>
            </Link>
            <Link to={`?note=${note.id}&type=edit`} className="mr-2 py-2 sp1_task_righ_action_btn">
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
        </div>
    </div> 
  )
}

export default Note