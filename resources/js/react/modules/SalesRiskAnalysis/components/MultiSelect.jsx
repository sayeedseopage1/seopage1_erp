import React from "react";
import PropTypes from "prop-types";

// styles
import style from "./multiSelect.module.css";

// Components
import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";
import _ from "lodash";

const MultiSelect = ({
    selected,
    setSelected,
    data,
    filedName,
    newPolicyData,
    selectedCountries,
}) => {
    const [search, setSearch] = React.useState("");
    let _Options = [];

    if (selectedCountries?.length) {
        const filterCountries = data?.filter(
            (item) => !selectedCountries?.includes(item)
        );
        _Options = _.filter(filterCountries, (item) =>
            _.includes(_.lowerCase(item?.name), _.lowerCase(search))
        );
    } else {
        _Options = _.filter(data, (item) =>
            _.includes(_.lowerCase(item?.name), _.lowerCase(search))
        );
    }

    React.useMemo(() => {
        if (!search) {
            if (selectedCountries?.length) {
                _Options = data?.filter(
                    (item) => !selectedCountries?.includes(item)
                );
            } else {
                _Options = data;
            }
        }
    }, [search]);

    const onSelected = (option) => {
        if (
            newPolicyData?.countries?.some((selectedItem) =>
                _.isEqual(selectedItem, option)
            )
        ) {
            console.log("includes");
            let newPolicyDataCopy = { ...newPolicyData };
            let updateCountry = newPolicyDataCopy?.countries?.filter(
                (country) => country.name !== option.name
            );

            setSelected({
                ...newPolicyDataCopy,
                [filedName]: updateCountry,
            });
        } else {
            if (newPolicyData?.countries?.length) {
                setSelected({
                    ...newPolicyData,
                    [filedName]: [...newPolicyData?.countries, option],
                });
            } else {
                setSelected({
                    ...newPolicyData,
                    [filedName]: [option],
                });
            }
        }
    };

    // remove tag
    const remove = (option) => {
        setSelected({
            ...newPolicyData,
            [filedName]: newPolicyData?.countries?.filter((p) => p !== option),
        });
    };

    return (
        <Dropdown disabled={true} className="cnx_select_box_dd">
            <Dropdown.Toggle
                className={`cnx_select_box_toggle ${style.cnx_select_box_toggle_multi}`}
            >
                <div
                    className="flex-wrap d-flex"
                    style={{
                        gap: "5px",
                    }}
                >
                    {selected?.length
                        ? selected?.map((item) => (
                              <div
                                  key={`${item?.name}-${Math?.random()}`}
                                  className="cnx_select_box_tag"
                              >
                                  <button
                                      aria-label="removeTag"
                                      onMouseDown={() => remove(item)}
                                  >
                                      <i className="fa-solid fa-xmark" />
                                  </button>
                                  <span>{item?.name}</span>
                              </div>
                          ))
                        : "Select Country"}
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
                className={`cnx_select_box_options ${style.multiSelectOptions}`}
            >
                <div className="cnx_select_box_search">
                    <SearchBox
                        autoFocus={true}
                        value={search}
                        onChange={setSearch}
                        className="cnx_select_box_search_input"
                    />
                </div>
                {_Options?.map((item) => (
                    <Dropdown.Item
                        key={item?.name}
                        className={`cnx_select_box_option ${
                            selected?.some((selectedItem) =>
                                _.isEqual(selectedItem, item)
                            )
                                ? "active"
                                : ""
                        }`}
                        onClick={() => {
                            onSelected(item);
                        }}
                        isCloseSingle={true}
                    >
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <p>
                                <img
                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${
                                        item.iso || "BD"
                                    }.svg`}
                                    height="25px"
                                    width="25px"
                                    className="mr-2"
                                    alt={item?.name}
                                />
                                {item.name}
                            </p>
                            {selected?.some((selectedItem) =>
                                _.isEqual(selectedItem, item)
                            ) && <i className="fa-solid fa-check" />}
                        </div>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MultiSelect;

MultiSelect.propTypes = {
    setSelected: PropTypes.func,
    options: PropTypes.func,
    newPolicyData: PropTypes.object,
    filedName: PropTypes.string,
    selectedCountries: PropTypes.array,
    selected: PropTypes.array,
    data: PropTypes.array,
};
