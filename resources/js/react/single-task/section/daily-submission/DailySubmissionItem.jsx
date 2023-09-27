import React from 'react';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const DailySubmissionItem = ({item, setModalData, modalData}) => {
    // const [show,setShow] = useState(false);
    const { task } = useSelector((s) => s.subTask);

    const timeFormatter = (time='') =>{
        console.log(time);
        const [year,month,date] = time.split(" ")[0].split("-");
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

    return (
        <tr 
            onClick={()=>{
                setModalData(prev=>{
                    if (prev?.id===item.id) {
                        return null;
                    } else {
                        return item;
                    }
                })
            }} 
        className='sp1_tlr_tr' style={{verticalAlign:'middle',margin:'0 auto',cursor:'pointer'}}>
            <td className='sp1_tlr_td' style={{minWidth:'100px',textAlign:'left'}}>
                <span className='singleline-ellipsis'>
                    <span className='text-primary'>Task#{task.id}</span>
                    {' submitted by '}
                    <span className='text-primary'>{item.developer_name}</span> 
                </span>                
            </td>
            <td className='sp1_tlr_td' style={{minWidth:'100px'}}>{timeFormatter(item.submission_creation_date)}</td>
            <td className='sp1_tlr_td' style={{minWidth:'50px'}}>
                {
                    modalData?.id===item.id?
                    <AiFillEyeInvisible style={{
                        height:'20px',
                        width:'20px',
                        cursor:'pointer',
                    }} 
                    // onClick={()=>{
                    //     setModalData(null);
                    //     // setShow(false);
                    // }} 
                    />
                    :
                    <AiFillEye style={{
                        height:'20px',
                        width:'20px',
                        cursor:'pointer',
                    }} 
                    // onClick={()=>{
                    //     setModalData(item);
                    //     // setShow(true);
                    // }}
                     />
                }
            </td>
        </tr>
    );
};

export default DailySubmissionItem;