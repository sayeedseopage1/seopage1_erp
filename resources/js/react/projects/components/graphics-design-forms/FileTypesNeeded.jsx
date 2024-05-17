import React from 'react';
import Dropdown from '../../../Insights/ui/Dropdown';
import SearchBox from '../../../Insights/ui/Searchbox';
// styles
import style from "./multiselect.module.css";

const FileTypesNeeded = ({ fileTypesNeeded, setFileTypesNeeded, multiple, readOnly }) => {
    const [search, setSearch] = React.useState('');

    const options = () => (["Favicon", "Only icon", "Logo with icon", "Logo without icon", "Others"]);

    const onSelected = (option) => {
        if (!readOnly) {
            if (multiple) {
                if (fileTypesNeeded && fileTypesNeeded.includes(option)) {
                    setFileTypesNeeded(fileTypesNeeded.filter(p => p !== option));
                } else {
                    setFileTypesNeeded([...(fileTypesNeeded || []), option]);
                }
            } else {
                setFileTypesNeeded([option]);
            }
        }
    }

    // remove tag
    const remove = (option) => {
        if (!readOnly && fileTypesNeeded) { // Check if fileTypesNeeded is not null
            setFileTypesNeeded(fileTypesNeeded.filter(p => p !== option));
        }
    }

    return (
        <React.Fragment>
            <Dropdown disabled={readOnly} className="cnx_select_box_dd">
                <Dropdown.Toggle className={`${style.cnx_select_box_custom}`}>
                    <div className="flex-wrap d-flex"
                        style={{
                            gap: "5px",
                        }}>
                        {fileTypesNeeded?.length > 0 ? fileTypesNeeded?.map(p => (
                            <div key={`${p}-${Math.random()}`} className="cnx_select_box_tag">
                                {!readOnly && <button aria-label='removeTag' onMouseDown={() => remove(p)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>}
                                <span>{p}</span>
                            </div>
                        )) : "Select File Types"}
                    </div>

                    {/* <button aria-label='close' onMouseDown={() => removeAll()}>
                        <i className="fa-solid fa-xmark" />
                    </button> */}
                </Dropdown.Toggle>
                {
                    !readOnly && <Dropdown.Menu className={`cnx_select_box_options ${style.multiSelectOptions}`}>
                        <div className='cnx_select_box_search'>
                            <SearchBox autoFocus={true} value={search} onChange={setSearch} className="cnx_select_box_search_input" />
                        </div>
                        {options()?.filter(f => f?.includes(search))?.map(option => (
                            <Dropdown.Item key={`${option}-${Math.random()}`}
                                onClick={() => onSelected(option)}
                                className={`cnx_select_box_option ${multiple ? fileTypesNeeded?.includes(option) && 'active' : fileTypesNeeded === option ? 'active' : ''}`}> {option}
                                {fileTypesNeeded?.includes(option) &&
                                    <i className="fa-solid fa-check" />}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                }
            </Dropdown>
        </React.Fragment>
    )
}

export default FileTypesNeeded;
