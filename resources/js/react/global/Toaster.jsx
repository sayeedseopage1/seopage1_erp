import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {
  return (
        <ToastContainer 
          position="top-right"
          autoClose={5000} 
          newestOnTop
        /> 
  )
}

export default Toaster