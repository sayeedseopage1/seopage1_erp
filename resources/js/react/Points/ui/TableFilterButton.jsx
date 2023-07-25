import * as React from 'react';
import Dropdown from '../../Insights/ui/Dropdown';
import SearchBox from '../../Insights/ui/Searchbox';
import { Icon } from '../../Insights/utils/Icon';
import {dataTableColumns} from '../utils/constants';



const TableFilterButton = () => {
    const [search, setSearch] = React.useState("");
    const [isSticky, setIsSticky] = React.useState(false);
    

   

    const handleOnScroll = (e) => {
            if(e.target.scrollTop > 0 ){
                    setIsSticky(true);
                }else{
                    setIsSticky(false);
            }
    }


    const columns = [...new Set(dataTableColumns)];
    return(
        <React.Fragment>
            <Dropdown>
                <Dropdown.Toggle icon={false} className="cnx__table_td_filter_btn_toggle">
                    <Icon type="Setting" />
                </Dropdown.Toggle>
                <Dropdown.Menu placement='bottom-end' className="cnx__table_column_filter_menu">
                    <div className='__search_box'>
                        <SearchBox value={search} onChange={setSearch} />
                    </div>

                    <div className="cnx_divider"/>

                    <div onScroll={handleOnScroll} className='cnx__table_filter_options'>
                        <div className='cnx__table_filter_not_visible_options'>
                            <div className={`__title ${isSticky ? '__sticky' : ''}`}>Visible</div>
                            {
                                columns.splice(0, 5).map((column) => (
                                    <label htmlFor={column} key={column} className='cnx__table_filter_visible_option'>
                                        <input type='checkbox' id={column} name="" />  
                                        <span>{column}</span>
                                    </label>
                                ))
                            } 
                        </div>
                        <div className='cnx__table_filter_not_visible_options'>
                            <div className={`__title ${isSticky ? '__sticky' : ''}`}>Not Visible</div>
                            {
                                columns.splice(5, columns.length).map((column) => (
                                    <label htmlFor={column} key={column} className='cnx__table_filter_visible_option'>
                                        <input type='checkbox' id={column} name="" />  
                                        <span>{column}</span>
                                    </label>
                                ))
                            } 
                        </div>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}


export default TableFilterButton;