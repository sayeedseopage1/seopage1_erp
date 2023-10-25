const Switch = ({children}) => {
    return(
       <div> {children} </div>
    ) 
 }
 
 const Case = ({children, condition}) => {
   if(!condition) return null;
   return (
     <div>{children}</div>
   )
 }

Switch.Case = Case;
 export default Switch