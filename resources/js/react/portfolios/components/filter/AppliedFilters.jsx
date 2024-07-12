import React from "react";

const AppliedFilters = ({
    cms,
    setCms,
    websiteType,
    setWebsiteType,
    websiteCategory,
    setWebsiteCategory,
    subCategory,
    setSubCategory,
    theme,
    setTheme,
    plugin,
    setPlugin,
    rating,
    setRating,
}) => {
    return (
        <div>
            {cms ||
            websiteType ||
            websiteCategory ||
            subCategory ||
            theme ||
            plugin ||
            rating ? (
                <div className="mt-3">
                    <h6 className="mb-2">Applied filteres: </h6>
                    <div
                        className="d-flex flex-wrap align-items-center"
                        style={{ gap: "4px" }}
                    >
                        {cms && (
                            <div className="filter-item">
                                <span>
                                    <span className="f-12 ">Website CMS: </span>{" "}
                                    <span className="font-weight-bold">
                                        {cms?.cms_name}{" "}
                                    </span>{" "}
                                </span>
                                <button onClick={() => setCms(null)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        )}
                        {websiteType && (
                            <div className="filter-item">
                                <span>
                                    <span className="f-12 ">
                                        Website type:{" "}
                                    </span>{" "}
                                    <span className="font-weight-bold">
                                        {websiteType?.website_type}{" "}
                                    </span>{" "}
                                </span>
                                <button onClick={() => setWebsiteType(null)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        )}

                        {websiteCategory && (
                            <div className="filter-item">
                                <span>
                                    <span className="f-12 ">
                                        Niche Category:{" "}
                                    </span>{" "}
                                    <span className="font-weight-bold">
                                        {websiteCategory?.category_name}{" "}
                                    </span>
                                </span>

                                <button
                                    onClick={() => setWebsiteCategory(null)}
                                >
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        )}
                        {subCategory && (
                            <div className="filter-item">
                                <span>
                                    <span className="f-12 ">
                                        Sub Niche Category:{" "}
                                    </span>{" "}
                                    <span className="font-weight-bold">
                                        {subCategory?.category_name}{" "}
                                    </span>
                                </span>

                                <button onClick={() => setSubCategory(null)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        )}
                        {theme && (
                            <div className="filter-item">
                                <span>
                                    <span className="f-12 ">Theme: </span>{" "}
                                    <span className="font-weight-bold">
                                        {theme?.theme_name}{" "}
                                    </span>
                                </span>
                                <button onClick={() => setTheme(null)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        )}

                        {plugin && (
                            <div className="filter-item">
                                <span>
                                    <span className="f-12 ">Plugin: </span>{" "}
                                    <span className="font-weight-bold">
                                        {plugin?.plugin_name}{" "}
                                    </span>
                                </span>
                                <button onClick={() => setPlugin(null)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        )}
                        {rating && (
                            <div className="filter-item">
                                <span>
                                    <span className="f-12 ">Rating: </span>{" "}
                                    <span className="font-weight-bold">
                                        {rating.name}{" "}
                                    </span>
                                </span>
                                <button onClick={() => setRating(null)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default AppliedFilters;
