import React from 'react';
import Dropdown from '../../../Insights/ui/Dropdown';
import SearchBox from '../../../Insights/ui/Searchbox';
// styles
import style from "./multiselect.module.css";

const FileExtensionMultiSelect = ({ fileExtension, setFileExtension, multiple, readOnly }) => {
    const [search, setSearch] = React.useState('');

    const options = () => ([".ai", ".psd", ".eps"]);

    const onSelected = (option) => {
        if (!readOnly) {
            if (multiple) {
                if (fileExtension && fileExtension.includes(option)) {
                    setFileExtension(fileExtension.filter(p => p !== option));
                } else {
                    setFileExtension([...(fileExtension || []), option]);
                }
            } else {
                setFileExtension([option]);
            }
        }
    }

    // remove tag
    const remove = (option) => {
        if (!readOnly && fileExtension) { // Check if fileExtension is not null
            setFileExtension(fileExtension.filter(p => p !== option));
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
                        {fileExtension?.length > 0 ? fileExtension?.map(p => (
                            <div key={`${p}-${Math.random()}`} className="cnx_select_box_tag">
                                {!readOnly && <button aria-label='removeTag' onMouseDown={() => remove(p)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>}
                                <span>{p}</span>
                            </div>
                        )) : "Select File Extension"}
                    </div>

                    {/* here is rendering a caret icon,svg, how can i remove it when readonly is true */}
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
                                className={`cnx_select_box_option ${multiple ? fileExtension?.includes(option) && 'active' : fileExtension === option ? 'active' : ''}`}> {option}
                                {fileExtension?.includes(option) &&
                                    <i className="fa-solid fa-check" />}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                }
            </Dropdown>
        </React.Fragment>
    )
}

export default FileExtensionMultiSelect;
