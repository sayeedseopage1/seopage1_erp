import React from "react";
import Dropdown from "../../../global/Dropdown";
import _ from "lodash";
import SearchBox from "../../../global/Searchbox";

const PortfolioFilterBar = ({
    cms,
    setCms,
    cmsSearch,
    setCmsSearch,
    websiteType,
    websiteCategorySearch,
    websiteCategory,
    websiteTypeSearch,
    filterMenuItems,
    setWebsiteTypeSearch,
    setWebsiteType,
    setWebsiteCategorySearch,
    setWebsiteCategory,
    subCategorySearch,
    setSubCategorySearch,
    subCategory,
    theme,
    themeSearch,
    setThemeSearch,
    setTheme,
    plugin,
    pluginSearch,
    setPluginSearch,
    setPlugin,
    subNiches,
    setSubCategory,
    filterThemes,
    filterPlugin,
    rating,
    setRating,
}) => {
    const ratingOptions = [
        { id: "1", name: "Poor (up to 1 star)" },
        { id: "2", name: "Below Average (up to 2 star)" },
        { id: "3", name: "Average (up to 3 star)" },
        { id: "4", name: "Good (up to 4 star)" },
        { id: "5", name: "Excellent (5 star)" },
    ];
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "15px",
            }}
        >
            {/* CMS Category */}
            <div className="portfolio-filter">
                <Dropdown>
                    <div>
                        <label htmlFor="">Website CMS</label>
                        <Dropdown.Toggle
                            className="portfolio-filter-dd-toggle"
                            iconSize={20}
                        >
                            <span className="singleline-ellipsis">
                                {cms?.cms_name ?? "--"}
                            </span>
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu
                        placement="bottom"
                        className="portfolio_dropdown_menu"
                    >
                        <div className="portfolio-filter-search-box">
                            <SearchBox
                                value={cmsSearch}
                                onChange={setCmsSearch}
                                autoFocus={true}
                            />
                        </div>
                        <div className="portfolio-filter-dd-menu">
                            {_.map(
                                _.filter(filterMenuItems?.project_cms, (q) =>
                                    _.lowerCase(q.cms_name).includes(
                                        _.lowerCase(cmsSearch)
                                    )
                                ),
                                (option) => (
                                    <abbr
                                        key={option.id}
                                        title={option.cms_name}
                                    >
                                        <Dropdown.Item
                                            className="d-flex items-center justify-content-between"
                                            onClick={() => {
                                                setCms(option),
                                                    setCmsSearch("");
                                            }}
                                        >
                                            <span
                                                className="singleline-ellipsis"
                                                style={{ width: "90%" }}
                                            >
                                                {option.cms_name}
                                            </span>
                                            {cms?.id === option.id && (
                                                <i className="fa-solid fa-check " />
                                            )}
                                        </Dropdown.Item>
                                    </abbr>
                                )
                            )}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Website type */}
            <div className="portfolio-filter">
                <Dropdown>
                    <div>
                        <label htmlFor="">Website Type</label>
                        <Dropdown.Toggle
                            className="portfolio-filter-dd-toggle"
                            iconSize={20}
                        >
                            <span className="singleline-ellipsis">
                                {websiteType?.website_type ?? "--"}
                            </span>
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu
                        placement="bottom"
                        className="postion-relative"
                    >
                        <div className="portfolio-filter-search-box">
                            <SearchBox
                                value={websiteTypeSearch}
                                onChange={setWebsiteTypeSearch}
                                autoFocus={true}
                            />
                        </div>
                        <div className="portfolio-filter-dd-menu">
                            {_.map(
                                _.filter(filterMenuItems?.website_types, (q) =>
                                    _.lowerCase(q.website_type).includes(
                                        _.lowerCase(websiteTypeSearch)
                                    )
                                ),
                                (option) => (
                                    <abbr
                                        title={option.website_type}
                                        key={option.id}
                                    >
                                        <Dropdown.Item
                                            className="d-flex items-center justify-content-between"
                                            onClick={() => {
                                                setWebsiteType(option),
                                                    setWebsiteTypeSearch("");
                                            }}
                                        >
                                            <span
                                                className="multiline-ellipsis"
                                                style={{ width: "90%" }}
                                            >
                                                {option.website_type}
                                            </span>
                                            {websiteType?.id === option.id && (
                                                <i className="fa-solid fa-check" />
                                            )}
                                        </Dropdown.Item>
                                    </abbr>
                                )
                            )}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Niche Category */}
            <div className="portfolio-filter">
                <Dropdown>
                    <div>
                        <label htmlFor="">Niche Category</label>
                        <Dropdown.Toggle
                            className="portfolio-filter-dd-toggle"
                            iconSize={20}
                        >
                            <span className="singleline-ellipsis">
                                {websiteCategory?.category_name ?? "--"}
                            </span>
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu placement="bottom" className="">
                        <div className="portfolio-filter-search-box">
                            <SearchBox
                                value={websiteCategorySearch}
                                onChange={setWebsiteCategorySearch}
                                autoFocus={true}
                            />
                        </div>
                        <div className="portfolio-filter-dd-menu">
                            {_.map(
                                _.filter(
                                    filterMenuItems?.website_categories,
                                    (q) =>
                                        !q.parent_category_id &&
                                        _.lowerCase(q.category_name).includes(
                                            _.lowerCase(websiteCategorySearch)
                                        )
                                ),
                                (option) => (
                                    <abbr
                                        title={option.category_name}
                                        key={option.id}
                                    >
                                        <Dropdown.Item
                                            className="d-flex items-center justify-content-between"
                                            onClick={() => {
                                                setWebsiteCategory(option),
                                                    setWebsiteCategorySearch(
                                                        ""
                                                    );
                                            }}
                                        >
                                            <span
                                                className="singleline-ellipsis"
                                                style={{ width: "90%" }}
                                            >
                                                {option.category_name}
                                            </span>
                                            {websiteCategory?.id ===
                                                option.id && (
                                                <i className="fa-solid fa-check " />
                                            )}
                                        </Dropdown.Item>
                                    </abbr>
                                )
                            )}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Sub Niche Category */}
            <div className="portfolio-filter">
                <Dropdown>
                    <div>
                        <label htmlFor="">Sub Niche Category</label>
                        <Dropdown.Toggle
                            className="portfolio-filter-dd-toggle"
                            iconSize={20}
                        >
                            <span className="singleline-ellipsis">
                                {subCategory?.category_name ?? "--"}
                            </span>
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu placement="bottom" className="">
                        <div className="portfolio-filter-search-box">
                            <SearchBox
                                value={subCategorySearch}
                                onChange={setSubCategorySearch}
                                autoFocus={true}
                            />
                        </div>
                        <div className="portfolio-filter-dd-menu">
                            {_.map(subNiches(), (option) => (
                                <abbr
                                    title={option.category_name}
                                    key={option.id}
                                >
                                    <Dropdown.Item
                                        className="d-flex items-center justify-content-between"
                                        onClick={() => {
                                            setSubCategory(option),
                                                setSubCategorySearch("");
                                        }}
                                    >
                                        <span
                                            className="singleline-ellipsis"
                                            style={{ width: "90%" }}
                                        >
                                            {option.category_name}
                                        </span>
                                        {subCategory?.id === option.id && (
                                            <i className="fa-solid fa-check ml-" />
                                        )}
                                    </Dropdown.Item>
                                </abbr>
                            ))}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Website Theme */}
            <div className="portfolio-filter">
                <Dropdown>
                    <div>
                        <label htmlFor="">Theme</label>
                        <Dropdown.Toggle
                            className="portfolio-filter-dd-toggle"
                            iconSize={20}
                        >
                            <span className="singleline-ellipsis">
                                {theme?.theme_name ?? "--"}
                            </span>
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu placement="bottom" className="">
                        <div className="portfolio-filter-search-box">
                            <SearchBox
                                value={themeSearch}
                                onChange={setThemeSearch}
                                autoFocus={true}
                            />
                        </div>
                        <div className="portfolio-filter-dd-menu">
                            {_.map(filterThemes(), (option) => (
                                <abbr title={option.theme_name} key={option.id}>
                                    <Dropdown.Item
                                        className="d-flex items-center justify-content-between"
                                        onClick={() => setTheme(option)}
                                    >
                                        <span
                                            className="singleline-ellipsis"
                                            style={{ width: "90%" }}
                                        >
                                            {option.theme_name}
                                        </span>
                                        {theme?.id === option.id && (
                                            <i className="fa-solid fa-check ml-" />
                                        )}
                                    </Dropdown.Item>
                                </abbr>
                            ))}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Website Plugin */}
            <div className="portfolio-filter">
                <Dropdown>
                    <div>
                        <label htmlFor="">Plugin</label>
                        <Dropdown.Toggle
                            className="portfolio-filter-dd-toggle"
                            iconSize={20}
                        >
                            <span className="singleline-ellipsis">
                                {plugin?.plugin_name ?? "--"}
                            </span>
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu placement="bottom" className="">
                        <div className="portfolio-filter-search-box">
                            <SearchBox
                                value={pluginSearch}
                                onChange={setPluginSearch}
                                autoFocus={true}
                            />
                        </div>
                        <div className="portfolio-filter-dd-menu">
                            {_.map(filterPlugin(), (option) => (
                                <abbr
                                    title={option.plugin_name}
                                    key={option.id}
                                >
                                    <Dropdown.Item
                                        className="d-flex items-center justify-content-between"
                                        onClick={() => setPlugin(option)}
                                    >
                                        <span
                                            className="singleline-ellipsis"
                                            style={{ width: "90%" }}
                                        >
                                            {option.plugin_name}
                                        </span>
                                        {plugin?.id === option.id && (
                                            <i className="fa-solid fa-check ml-" />
                                        )}
                                    </Dropdown.Item>
                                </abbr>
                            ))}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Rating */}
            <div className="portfolio-filter">
                <Dropdown>
                    <div>
                        <label htmlFor="">Rating</label>
                        <Dropdown.Toggle
                            className="portfolio-filter-dd-toggle"
                            iconSize={20}
                        >
                            <span className="singleline-ellipsis">
                                {rating?.name ?? "--"}
                            </span>
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu placement="bottom" className="">
                        <div className="portfolio-filter-search-box">
                            <SearchBox
                                value={pluginSearch}
                                onChange={setPluginSearch}
                                autoFocus={true}
                            />
                        </div>
                        <div className="portfolio-filter-dd-menu">
                            {_.map(ratingOptions, (option) => (
                                <abbr title={option.name} key={option.id}>
                                    <Dropdown.Item
                                        className="d-flex items-center justify-content-between"
                                        onClick={() => setRating(option)}
                                    >
                                        <span
                                            className="singleline-ellipsis"
                                            style={{ width: "90%" }}
                                        >
                                            {option.name}
                                        </span>
                                        {/* {plugin?.id === option.id && (
                                            <i className="fa-solid fa-check ml-" />
                                        )} */}
                                    </Dropdown.Item>
                                </abbr>
                            ))}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default PortfolioFilterBar;
