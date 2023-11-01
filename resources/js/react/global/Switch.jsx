const Switch = ({children}) => {
    return(
       <> {children} </>
    )
 }

 const Case = ({children, condition}) => {
   if(!condition) return null;
   return (
     <>{children}</>
   )
 }

Switch.Case = Case;
 export default Switch
