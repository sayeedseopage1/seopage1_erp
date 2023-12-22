import { Listbox } from "@headlessui/react";
import styles from "./SalesFilter.module.css";
import Avatar from "../../../../global/Avatar";

export default function SalesFilter({ value, onChange, data }) {
    return (
        <div className={styles.toggleWrapper}>
            <span><strong>Sales:</strong> </span>

            <Listbox
                as="div"
                value={value}
                onChange={onChange}
                className={styles.dropdown}
            >
                <Listbox.Button className={styles.dropdownToggle}>
                    {value?.name ?? "--"}
                </Listbox.Button>
                <Listbox.Options className={styles.dropdownMenu}>
                    {data.map((person) => (
                        <Listbox.Option
                            className={({ active, selected }) =>
                                `${styles.dropdownItem} ${
                                    active && styles.dropdownItemActive
                                } ${selected && styles.dropdownItemSelected}`
                            }
                            key={person.id}
                            value={person}
                        >
                            <Avatar 
                              src={person?.image_url ?? null}
                              name={person.name}
                              width={28}
                              height={28}
                              type="circle"
                            />
                            {person.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
