import ReactDOM from 'react-dom';
import './filterbar.css';

const FilterContainer = ({children}) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById('disputeFilterbar')
  )
}

export default FilterContainer