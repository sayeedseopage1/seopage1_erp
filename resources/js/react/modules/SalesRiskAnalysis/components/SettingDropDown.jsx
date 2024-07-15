import React, { useEffect } from "react";
import styles from "./settingDropDown.module.css";
import Dropdown from "./Dropdown";
import { PiGearDuotone } from "react-icons/pi";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../services/features/saleRiskAnalysisSlice";

const SettingDropDown = () => {
    const { settings } = useSelector((state) => state.saleRiskAnalysis);
    const dispatch = useDispatch();

    return (
        <div className={styles.table_filter}>
            <Dropdown>
                <Dropdown.Toggle icon={false} className={styles.filter_button}>
                    <PiGearDuotone className={styles.gear_icon} />
                </Dropdown.Toggle>
                <Dropdown.Menu
                    placement="bottom-end"
                    className={styles.filter_menu}
                >
                    <ul className={styles.list}>
                        <li  className={styles.list_item}>
                            <label htmlFor={settings.name} className="mb-0">
                                <input
                                    type="checkbox"
                                    name="column_filter"
                                    id={settings.name}
                                    checked={settings.value}
                                    onChange={(e) => {
                                        dispatch(
                                            updateSetting({
                                                value: e.target.checked,
                                                name: settings.name,
                                            })
                                        );
                                    }}
                                />{" "}
                                {settings.label}
                            </label>
                        </li>
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default SettingDropDown;
