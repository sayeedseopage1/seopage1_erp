import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";



const NotPermission = () => {
    const { users, getUserById } = useUsers();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        setIsPageLoading(true);
        if(users.users.length){
            // console.log(users)
            const user = getUserById(users, window.Laravel.user.id);
            if(user && user.role_id === 1 || user.role_id === 8 || user.role_id === 7){
                setIsPageLoading(false);
                navigate('/account/insights/dashboard/my-dashboard');
            } else {
                setIsPageLoading(false);
            }
            
        }
    }, [users])


     if(isPageLoading) return <div 
        style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: "100%", 
        height: '100vh'
        }}>
        <div className="spinner-border" role="status">  </div>
        Loading...
    </div>

   return(
        <div 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh'
            }} 
        >
            <h5>
                 You don't have permission to access this page
            </h5>
        </div>
   ) 
}


export default NotPermission;