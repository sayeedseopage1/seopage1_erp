import React from "react";
import "./selection.css";
import _, { filter } from "lodash";
import { useState } from "react";
import Search from "./Search";
import { useRef } from "react";
import { useEffect } from "react";
import CustomScrollbar from "../CustomScrollbar";

const Selection = ({
    value,
    onSelected,
    options,
    namespace = "Select",
    placeholder,
    searchEnable = false,
    removeAble = false,
    multiple = false,
    enableAllSelection = false,
    children,
    optionClassName = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [searchValue, setSearchValue] = useState("");
    const [defaultHoverEffect, setDefaultHoverEffect] = useState("");
    const wrapperRef = useRef(null);
    const searchRef = useRef(null);

    // filter
    useEffect(() => {
        const _filteredOptions = options.filter((o) =>
            _.toLower(o).includes(_.toLower(searchValue))
        );
        setFilteredOptions(_filteredOptions);
        setDefaultHoverEffect(_filteredOptions[0]);
    }, [searchValue]);

    // initial
    useEffect(() => {
        setDefaultHoverEffect(
            enableAllSelection ? "all select" : filteredOptions[0]
        );
    }, []);

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    // auto focus
    useEffect(() => {
        if (searchRef && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isOpen, searchRef]);

    // outside click
    useEffect(() => {
        let timeout;
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                clearTimeout(timeout);
            }
        };

        if (isOpen) {
            timeout = setTimeout(
                () => window.addEventListener("click", handleClickOutside),
                100
            );
        }
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, wrapperRef]);

    // toggle
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // is active
    const isActive = (option) => {
        return _.isArray(value) ? value.includes(option) : value === option;
    };

    // handle selection
    const handleSelection = (option) => {
        if (multiple) {
            let arr = [...value];
            // checked is already exist
            const indexOf = value.indexOf(option);
            // if existed remove
            if (indexOf > -1) {
                arr.splice(indexOf, 1);
            } else {
                arr.push(option);
            }

            onSelected ? onSelected(arr) : null;
            setIsOpen(false);
            return;
        }

        onSelected ? onSelected(option) : null;
        setIsOpen(false);
    };

    // end selection handle

    // remove
    const handleRemove = (option) => {
        let arr = [...value];
        // console.log("clicked");
        // find index
        const index = arr.indexOf(option);
        // console.log(index);
        if (index > -1) {
            arr.splice(index, 1);
        }

        return onSelected && onSelected(arr);
    };

    return (
        <div className="sp1_selection">
            <div onClick={toggle} className="sp1_selection--toggle">
                {_.isArray(value) ? (
                    value.length > 0 ? (
                        value.map((v) => (
                            <div
                                key={Math.random()}
                                className="d-flex align-items-center sp1_selection--tag"
                            >
                                <button
                                    onMouseDown={() => handleRemove(v)}
                                    aria-describedby="closeTab"
                                    className="sp1_selection--tag-close"
                                >
                                    &times;
                                </button>
                                <span>{v}</span>
                            </div>
                        ))
                    ) : (
                        <span style={{ color: "#777" }}>{placeholder}</span>
                    )
                ) : (
                    <span className="">{value || placeholder}</span>
                )}

                {value && removeAble ? (
                    <button
                        onMouseDown={() =>
                            onSelected ? onSelected(multiple ? [] : "") : null
                        }
                        aria-describedby="removeAllSelectedData"
                        className="ml-auto sp1_selection--remove"
                    >
                        &times;
                    </button>
                ) : null}

                {isOpen ? (
                    <i className="fa-solid fa-caret-up" />
                ) : (
                    <i className="fa-solid fa-caret-down" />
                )}
            </div>
            {isOpen ? (
                <div ref={wrapperRef} className="sp1_selection--menu">
                    {searchEnable ? (
                        <div className="sp1_selection--search-box">
                            <Search
                                ref={searchRef}
                                value={searchValue}
                                onChange={setSearchValue}
                            />
                        </div>
                    ) : null}

                    {enableAllSelection && !searchValue ? (
                        <div className="sp1_selection--search-box">
                            <div
                                onClick={() => onSelected(options)}
                                onMouseOver={() =>
                                    setDefaultHoverEffect("all select")
                                }
                                className={` all${
                                    defaultHoverEffect === "all select"
                                        ? " hover"
                                        : ""
                                }`}
                            >
                                <span>All {namespace}</span>
                            </div>
                        </div>
                    ) : null}
                    <CustomScrollbar minH={0} maxH={400}>
                        <ul
                            className={`sp1_selection--options mb-3 ${optionClassName}`}
                        >
                            {filteredOptions.length > 0
                                ? filteredOptions.map((option) => (
                                      <React.Fragment
                                          key={`${option}.${Math.random()}`}
                                      >
                                          <li
                                              onClick={() =>
                                                  handleSelection(option)
                                              }
                                              onMouseOver={() =>
                                                  setDefaultHoverEffect(option)
                                              }
                                              className={`sp1_selection--option mb-1${
                                                  defaultHoverEffect === option
                                                      ? " hover"
                                                      : ""
                                              }`}
                                          >
                                              <span>{option}</span>
                                              <i
                                                  className="fa-solid fa-check"
                                                  style={{
                                                      opacity: isActive(option)
                                                          ? 1
                                                          : 0,
                                                  }}
                                              />
                                          </li>
                                      </React.Fragment>
                                  ))
                                : null}
                        </ul>
                    </CustomScrollbar>

                    {children &&
                        children(
                            (v) => setDefaultHoverEffect(v),
                            defaultHoverEffect
                        )}
                </div>
            ) : null}
        </div>
    );
};

export default Selection;
