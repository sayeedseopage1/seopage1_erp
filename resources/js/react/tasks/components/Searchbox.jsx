/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import * as React from 'react';

const SearchBox = ({value, onChange, placeholder="Search", autoFocus=false, className="", ...props}) => {
        const ref = React.useRef(null);
        React.useEffect(() => {
            if (autoFocus) {
                ref.current.focus();
            }
        }, [autoFocus, ref])
        return (
            <div className='cnx__ins__ui_search'>
                <input
                    type='text'
                    placeholder= {placeholder}
                    value={value}
                    className={`cnx__ins__ui_search_input ${className}`}
                    onChange={e => onChange(e.currentTarget.value)}
                    ref={ref}
                    style={{marginTop: '2px', ...props?.style}}
                    {...props}
                />

                {/* search icons */}
                    <div className='cnx__ins__ui_search_icon' >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className='cnx__ins__ui_search_icon_svg'
                            viewBox="0 0 24 24" width="15" height="15">
                            <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>
                        </svg>
                    </div>
            </div>
        )
    }


SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    autoFocus: PropTypes.bool,
}


export default SearchBox;
