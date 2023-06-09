import * as React from 'react';
import Dropdown from '../../Insights/ui/Dropdown';
import SearchBox from '../../Insights/ui/Searchbox';

import { useGetEmployeeOptionsMutation } from '../../services/api/FilterBarOptionsApiSlice';
import _ from 'lodash';
import  TextHighlighter from '../../Insights/components/TextHighlighter';


export default function ProjectFilterItem({
    items= [],
    title,
    selected,
    onSelect,
    isLoading = true
}){
    const [search, setSearch] = React.useState(''); 
    const [maxHeight, setMaxHeight] = React.useState(720);

     // set max height
     React.useEffect(() => {
        if(window){
            if(window.innerHeight < 720){
                 setMaxHeight(window.innerHeight - 150);
            } 
         }
    }, [maxHeight])


    return(
        <div className='d-flex align-items-center px-3 py-2 border-right'>
            <span className='mr-2'>{title}</span>
            <Dropdown>
                <Dropdown.Toggle
                    className="sp1__pp_filter_dd_toggle"
                >
                {!selected ? 'All' : selected?.project_name}
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="sp1__pp_filter_dd"
                >

                {
                    isLoading ? (
                        <React.Fragment>
                            <div
                                className={`mt-2`}    
                            >
                               <div 
                                    className="spinner-border" 
                                    role="status" 
                                    style={{
                                        width: '1rem', 
                                        height: '1rem', 
                                        borderWidth: '0.15rem', 
                                        borderColor: "#777",
                                        borderRightColor: 'transparent'
                                    }}
                                >
                                </div>
                                <span className='d-inline ml-2' style={{color:'#777'}}>Loading...</span>
                            </div>
                        </React.Fragment>
                    ) :
                        <React.Fragment>

                            {
                                items?.length > 15 && 
                                <React.Fragment>
                                    <div className="sp1__pp_filter_dd_search">
                                        <SearchBox
                                            value={search}
                                            onChange={setSearch}
                                            autoFocus={true}
                                        />
                                    </div>
                                    <div className='cnx_divider'/>
                                </React.Fragment>
                            }
                             
                            {/* data */}
                            <div
                                className='sp1__pp_menu_items'
                                style={{maxHeight}}
                            >
                                <Dropdown.Item
                                    onClick={(e) => onSelect(e, null)}
                                    className={`sp1__pp_filter_dd_item mb-1 ${!selected && 'active'}`} 
                                >
                                    Select All
                                </Dropdown.Item>
                                

                                {/* item */}
                                {
                                    items?.filter(item => _.lowerCase(item?.project_name).includes(_.lowerCase(search)))
                                    .map(item => (
                                        <Dropdown.Item
                                            key={item?.id}
                                            onClick={(e) => onSelect(e, item)}
                                            className={`sp1__pp_filter_dd_item mb-1 ${selected?.id === item?.id ? 'active': ''}`} 
                                        >
                                            
                                            <TextHighlighter
                                                textToHighlight={item?.project_name}
                                                searchWords={search}
                                            /> 
                                        </Dropdown.Item>
                                    ))
                                } 
                            </div>
                        
                        </React.Fragment>
                }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}