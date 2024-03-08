import React from "react";
import PropTypes from "prop-types";

// styles
import style from "./multiSelect.module.css";

// Components
import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";

const MultiSelect = ({
    selected,
    setSelected,
    multiple,
    data,
    filedName,
    newPolicyData,
}) => {
    const [search, setSearch] = React.useState("");
    let _Options;

    _Options = _.filter(data, (item) =>
        _.includes(_.lowerCase(item?.name), _.lowerCase(search))
    );

    React.useMemo(() => {
        if (!search) {
            _Options = data;
        }
    }, [search]);

    const onSelected = (option) => {
        if (newPolicyData?.countries?.includes(option)) {
            console.log(option);
            setSelected({
                ...newPolicyData,
                [filedName]: newPolicyData?.countries?.filter(
                    (p) => p !== option
                ),
            });
        } else {
            console.log(option, "else");
            setSelected({
                ...newPolicyData,
                [filedName]: [...newPolicyData?.countries, option],
            });
        }
    };

    // remove tag
    const remove = (option) => {
        setSelected({
            ...newPolicyData,
            [filedName]: newPolicyData?.countries?.filter((p) => p !== option),
        });
    };

    // remove all tags
    const removeAll = () => {
        setSelected({
            ...newPolicyData,
            [filedName]: [],
        });
    };

    return (
        <React.Fragment>
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
                <Dropdown.Menu className="cnx_select_box_options pipeline">
                    <div className="cnx_select_box_search">
                        <SearchBox
                            autoFocus={true}
                            value={search}
                            onChange={setSearch}
                            className="cnx_select_box_search_input"
                        />
                    </div>

                    {_Options.map((item) => (
                        <Dropdown.Item
                            key={item?.name}
                            className={`cnx_select_box_option ${
                                multiple
                                    ? selected?.includes(item) && "active"
                                    : selected === item
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => {
                                onSelected(item);
                            }}
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
                                        alt={item.name}
                                    />
                                    {item.name}
                                </p>
                                {selected?.includes(item) && (
                                    <i className="fa-solid fa-check" />
                                )}
                            </div>
                        </Dropdown.Item>
                    ))}

                    {/* {
                      multiple && (
                          <>
                              <Dropdown.Item
                              onClick={() => setSelected([...options()])}
                              className={`cnx_select_box_option all`}> All Pipeline </Dropdown.Item>
                              <div className="hr" />
                          </>
                      )
                  } */}
                    {/* {options()
                        ?.filter((f) => f.includes(search))
                        .map((option) => (
                            <Dropdown.Item
                                key={`${option}-${Math.random()}`}
                                onClick={() => onSelected(option)}
                                className={`cnx_select_box_option ${
                                    multiple
                                        ? pipeline.includes(option) && "active"
                                        : pipeline === option
                                        ? "active"
                                        : ""
                                }`}
                            >
                                {" "}
                                {option}
                                {pipeline.includes(option) && (
                                    <i className="fa-solid fa-check" />
                                )}
                            </Dropdown.Item>
                        ))} */}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default MultiSelect;

MultiSelect.propTypes = {
    pipeline: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    multiple: PropTypes.bool.isRequired,
    options: PropTypes.func.isRequired,
    newPolicyData: PropTypes.object.isRequired,
    filedName: PropTypes.string.isRequired,
};
