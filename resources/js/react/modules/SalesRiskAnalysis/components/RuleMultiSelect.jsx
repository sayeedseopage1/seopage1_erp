import React from "react";
import PropTypes from "prop-types";

// ui components
import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";

// styles
import style from "./multiSelect.module.css";

const RuleMultiSelect = ({
    data,
    selected,
    setSelected,
    singleQuestion,
    filedName,
}) => {
    const [search, setSearch] = React.useState("");
    let _Options = [];

    _Options = _.filter(data, (item) =>
        _.includes(_.lowerCase(item?.title), _.lowerCase(search))
    );

    const onSelected = (option) => {
        if (
            singleQuestion?.ruleList?.some((selectedItem) =>
                _.isEqual(selectedItem, option)
            )
        ) {
            let singleQuestionCopy = { ...singleQuestion };
            setSelected({
                ...singleQuestionCopy,
                [filedName]: singleQuestionCopy?.ruleList?.filter(
                    (item) => item !== option
                ),
            });
        } else {
            
            if (singleQuestion?.ruleList?.length) {
                setSelected({
                    ...singleQuestion,
                    [filedName]: [...singleQuestion?.ruleList, option],
                });
            } else {
                setSelected({
                    ...singleQuestion,
                    [filedName]: [option],
                });
            }
        }
    };

    // remove tag
    const remove = (option) => {
        setSelected({
            ...singleQuestion,
            [filedName]: singleQuestion?.ruleList?.filter((p) => p !== option),
        });
    };

    React.useMemo(() => {
        if (!search) {
            _Options = data;
        }
    }, [search]);

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
                                      key={`${item?.title}-${Math?.random()}`}
                                      className="cnx_select_box_tag"
                                  >
                                      <button
                                          aria-label="removeTag"
                                          onMouseDown={() => remove(item)}
                                      >
                                          <i className="fa-solid fa-xmark" />
                                      </button>
                                      <span>{item?.title}</span>
                                  </div>
                              ))
                            : "Select Rule"}
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
                                <p>{item.title}</p>
                                {selected?.some((selectedItem) =>
                                    _.isEqual(selectedItem, item)
                                ) && <i className="fa-solid fa-check" />}
                            </div>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default RuleMultiSelect;
