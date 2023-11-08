import PropTypes from 'prop-types';
import styles from "../../../styles/filterbar.module.css";
import * as React from 'react';


const filterCtx = React.createContext(null);
const useFilter = () => React.useContext(filterCtx);



// user
const BasicFilter = ({
    display,
    onChange,
    data,
    isLoading,
    onClick,
    label,
    id= 'basic-filter'
}) => {
    return (
        <FilterItem id={id}>
            <Dropdown className={styles.filterDropdown}>
                <div className={styles.filterDropdownToggleContainer}>
                    <div className={styles.filterItemTitle}>{label}:</div>
                    <Dropdown.Toggle className={styles.filterDropdownToggle}>
                        <button
                            onClick={onClick}
                            className={styles.filterItemValue}
                        >
                            {display()}
                        </button>
                    </Dropdown.Toggle>
                </div>

                <Dropdown.Menu>
                    <div className={styles.filterOptions}>
                        {isLoading ? (
                            <div className={styles.filterLoader}>
                                <Loader title="Loading..." />
                            </div>
                        ) : (
                            _.map(data, (d) => (
                                <Dropdown.Item
                                    key={d.id}
                                    className={styles.filterOption}
                                    onClick={() => onChange(d)}
                                >
                                    {user.name}
                                </Dropdown.Item>
                            ))
                        )}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </FilterItem>
    );
};

BasicFilter.propTypes = {
    display: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string
}



export default BasicFilter
