import { useEffect } from "react";
import { useUsers } from "../hooks/useUsers";



const NotPermission = () => {
    const { users, getUserById } = useUsers();
    
    useEffect(() => {
        if(users.users.length){
            const user = getUserById(users, window.Laravel.user.id);
            
                console.log(user)
        }
    }, [])

   return(
        <div 
            style={{
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