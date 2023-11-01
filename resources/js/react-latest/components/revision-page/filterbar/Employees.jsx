import styles from "../../../styles/filterbar.module.css";
import Dropdown from "../../../ui/Dropdown";
import Loader from "../../../ui/Loader";

// user
const Employees = ({ value, onChange, data, isLoading, onClick, label }) => {
    return (
        <Dropdown className={styles.filterDropdown}>
            <div className={styles.filterDropdownToggleContainer}>
                <div className={styles.filterItemTitle}>{label}:</div>
                <Dropdown.Toggle className={styles.filterDropdownToggle}>
                    <button
                        onClick={onClick}
                        className={styles.filterItemValue}
                    >
                        {value?.name ?? "All"}
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
                        _.map(data, (user) => (
                            <Dropdown.Item
                                key={user.id}
                                className={styles.filterOption}
                                onClick={() => onChange(user)}
                            >
                                {user.name}
                            </Dropdown.Item>
                        ))
                    )}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Employees;
