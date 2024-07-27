import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./portfolio.css";
import PortfolioItem from "./PortfolioItem";
import {
    useGetPortfolioDataQuery,
    useGetPortfolioFilterMenuItemsQuery,
    useLazyGetPortfolioDataByIdQuery,
} from "../services/api/portfolioApiSlice";

import _ from "lodash";
import Pagination from "./components/Pagination";
import { Placeholder } from "../global/Placeholder";
import PortfolioFilterBar from "./components/filter/PortfolioFilterBar";
import ListOrTableView from "./components/filter/ListorTableView";
import DataTable from "./components/Table/DataTable";
import { PortfolioTableColumns } from "./components/Table/Columns/PortfolioTableColumns";
import AppliedFilters from "./components/filter/AppliedFilters";
import { useLocation } from "react-router-dom";
import { PendingOrCompleted } from "./components/filter/PendingOrCompleted";
import { useAuth } from "../hooks/useAuth";
import PortfolioModal from "./components/PortfolioModal";

const Portfolio = () => {
    const auth = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("show", "all");
        setSearchParams(newSearchParams);
    }, []);

    const [cms, setCms] = useState(null);
    const [cmsSearch, setCmsSearch] = useState("");
    const [websiteType, setWebsiteType] = useState(null);
    const [websiteTypeSearch, setWebsiteTypeSearch] = useState("");
    const [websiteCategory, setWebsiteCategory] = useState(null);
    const [websiteCategorySearch, setWebsiteCategorySearch] = useState("");
    const [subCategory, setSubCategory] = useState(null);
    const [subCategorySearch, setSubCategorySearch] = useState("");
    const [theme, setTheme] = useState(null);
    const [themeSearch, setThemeSearch] = useState("");
    const [plugin, setPlugin] = useState(null);
    const [pluginSearch, setPluginSearch] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [rating, setRating] = useState(null);
    //   filter bar data
    const { data: filterMenuItems, isFetching: filterMenuIsLoading } =
        useGetPortfolioFilterMenuItemsQuery();

    //   memorize filter data to avoid re-render
    const _cms = React.useMemo(() => cms, [cms]);
    const _webtype = React.useMemo(() => websiteType, [websiteType]);
    const _webCategory = React.useMemo(
        () => websiteCategory,
        [websiteCategory]
    );
    const _webSubCategory = React.useMemo(() => subCategory, [subCategory]);
    const _theme = React.useMemo(() => theme, [theme]);
    const _plugin = React.useMemo(() => plugin, [plugin]);
    const _pageIndex = React.useMemo(() => pageIndex, [pageIndex]);
    const _pageSize = React.useMemo(() => pageSize, [pageSize]);
    const _rating = React.useMemo(() => rating, [rating]);

    //mitul work

    const [tableView, setTableView] = React.useState("listView");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const portfolio_id = queryParams.get("portfolio_id");

    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    const { data, isFetching: dataLoading } = useGetPortfolioDataQuery(
        queryString({
            page: _pageIndex,
            page_size: _pageSize,
            cms: _cms?.id,
            website_category: _webCategory?.id,
            website_type: _webtype?.id,
            website_sub_category: _webSubCategory?.id,
            theme_name: _theme?.theme_name,
            theme_id: _theme?.id,
            plugin_name: _plugin?.plugin_name,
            plugin_id: _plugin?.id,
            rating_id: _rating?.id,
        }),
        { refetchOnMountOrArgChange: true }
    );

    const portfolioMain = data;

    const portfolio = data?.data;

    const [dataById, setDataById] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [getPortfolioDataById, { isFetching }] =
        useLazyGetPortfolioDataByIdQuery();

    const handleToggleModal = async (portfolio_id) => {
        setShowModal(true);
        const res = await getPortfolioDataById(portfolio_id).unwrap();
        setDataById(res);
    };

    useEffect(() => {
        if (portfolio_id) {
            setTableView("listView");
            handleToggleModal(portfolio_id);
        }
    }, []);
    const close = () => setShowModal(false);
    const subNiches = () => {
        let data = _.filter(
            filterMenuItems?.website_categories,
            (d) => d.parent_category_id
        );
        data = _.filter(data, (d) =>
            _.lowerCase(d.category_name).includes(
                _.lowerCase(subCategorySearch)
            )
        );

        if (websiteCategory && websiteCategory.id) {
            data = _.filter(
                data,
                (d) => d.parent_category_id === websiteCategory.id
            );
        }

        return data;
    };

    console.log(filterMenuItems);

    const filterThemes = () => {
        let data = _.filter(
            filterMenuItems?.website_themes,
            (f) => f?.theme_name?.toLowerCase() !== "n/a"
        );
        if (themeSearch) {
            data = _.filter(filterMenuItems?.website_themes, (q) =>
                _.lowerCase(q.theme_name).includes(_.lowerCase(themeSearch))
            );
        }
        return data;
    };

    const filterPlugin = () => {
        let data = _.filter(
            filterMenuItems?.website_plugins,
            (f) => f?.plugin_name?.toLowerCase() !== "n/a"
        );
        if (pluginSearch) {
            data = _.filter(filterMenuItems?.website_plugins, (q) =>
                _.lowerCase(q.plugin_name).includes(_.lowerCase(pluginSearch))
            );
        }
        return data;
    };

    const getData = (type) => {
        let _data = portfolio;
        switch (type) {
            case "all":
                return _data;
            case "pending":
                return _.filter(_data, (d) => d.rating_score === null);

            case "authorized":
                return _.filter(_data, (d) => d.rating_score !== null);
            default:
                return _data;
        }
    };

    const _data = {
        all: getData(null),
        pending: getData("pending"),

        authorized: getData("authorized"),
    };

    const tableData = (type) => {
        if (type) {
            return _data[type];
        } else return [];
    };

    return (
        <section>
            <div className="portfolio_all_filter_section">
                {/* portfolio filter bar */}
                <section className="portfolio_filter_bar">
                    <PortfolioFilterBar
                        cms={cms}
                        setCms={setCms}
                        cmsSearch={cmsSearch}
                        setCmsSearch={setCmsSearch}
                        websiteType={websiteType}
                        websiteCategorySearch={websiteCategorySearch}
                        websiteCategory={websiteCategory}
                        websiteTypeSearch={websiteTypeSearch}
                        filterMenuItems={filterMenuItems}
                        setWebsiteTypeSearch={setWebsiteTypeSearch}
                        setWebsiteType={setWebsiteType}
                        setWebsiteCategorySearch={setWebsiteCategorySearch}
                        setWebsiteCategory={setWebsiteCategory}
                        subCategorySearch={subCategorySearch}
                        setSubCategorySearch={setSubCategorySearch}
                        subCategory={subCategory}
                        theme={theme}
                        themeSearch={themeSearch}
                        setThemeSearch={setThemeSearch}
                        setTheme={setTheme}
                        plugin={plugin}
                        pluginSearch={pluginSearch}
                        setPluginSearch={setPluginSearch}
                        setPlugin={setPlugin}
                        subNiches={subNiches}
                        setSubCategory={setSubCategory}
                        filterThemes={filterThemes}
                        filterPlugin={filterPlugin}
                        rating={rating}
                        setRating={setRating}
                    />
                </section>

                {/* list or table view of completed/pending/all filter */}
                {_.includes([1, 8], auth.getRoleId()) && (
                    <section className="portfolio_filter_section portfolio_filter_section_multiple">
                        <div style={{ marginTop: "12px" }}>
                            <PendingOrCompleted data={_data} />
                        </div>

                        <ListOrTableView
                            tableView={tableView}
                            setTableView={setTableView}
                        />
                    </section>
                )}
                {_.includes([7], auth.getRoleId()) && (
                    <section className="portfolio_filter_section portfolio_filter_section_single">
                        <ListOrTableView
                            tableView={tableView}
                            setTableView={setTableView}
                        />
                    </section>
                )}

                {/* applied filters */}
                <section>
                    <AppliedFilters
                        cms={cms}
                        setCms={setCms}
                        websiteType={websiteType}
                        setWebsiteType={setWebsiteType}
                        websiteCategory={websiteCategory}
                        setWebsiteCategory={setWebsiteCategory}
                        subCategory={subCategory}
                        setSubCategory={setSubCategory}
                        theme={theme}
                        setTheme={setTheme}
                        plugin={plugin}
                        setPlugin={setPlugin}
                        rating={rating}
                        setRating={setRating}
                    />
                </section>
            </div>

            {tableView === "listView" ? (
                <div>
                    <div className="row py-4 mx-1">
                        {dataLoading || filterMenuIsLoading ? (
                            _.times(pageSize, (n) => (
                                <div className="col-3 mb-2" key={n}>
                                    <ItemLoader />
                                </div>
                            ))
                        ) : !dataLoading &&
                          _.size(portfolio) === 0 &&
                          (cms ||
                              websiteType ||
                              websiteCategory ||
                              subCategory ||
                              theme ||
                              plugin) ? (
                            <div
                                className="d-flex flex-column align-items-center justify-content-center w-100"
                                style={{ height: "30vh" }}
                            >
                                <div
                                    className="font-weight-bold text-center"
                                    style={{ color: "#919191" }}
                                >
                                    No data found after applying selected
                                    filters, please customize filters
                                </div>
                            </div>
                        ) : !dataLoading && _.size(portfolio) === 0 ? (
                            <div
                                className="d-flex flex-column align-items-center justify-content-center w-100"
                                style={{ height: "30vh" }}
                            >
                                <div
                                    className="font-weight-bold text-center"
                                    style={{ color: "#919191" }}
                                >
                                    No Data Available
                                </div>
                            </div>
                        ) : (
                            <div className="portfolio_list_item_parent">
                                {_.map(
                                    tableData(searchParams.get("show")),
                                    (item, index) => (
                                        <div key={item.id}>
                                            <PortfolioItem
                                                portfolioData={item}
                                                id={item?.id}
                                                isLoading={dataLoading}
                                                url={item?.portfolio_link?.toLowerCase()}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="portfolio_table_item_parent">
                    <DataTable
                        tableData={tableData(searchParams.get("show"))}
                        tableColumns={PortfolioTableColumns}
                        isLoading={dataLoading || filterMenuIsLoading}
                        tableName="portfolio Table"
                    />
                </div>
            )}
            <div>
                <Pagination
                    currentPage={pageIndex}
                    perpageRow={portfolioMain?.per_page}
                    onPaginate={(v) => setPageIndex(v)}
                    totalEntry={portfolioMain?.total}
                    onNext={() => setPageIndex((prev) => prev + 1)}
                    disableNext={!portfolioMain?.next_page_url}
                    onPrevious={() => setPageIndex((prev) => prev - 1)}
                    disablePrevious={!portfolioMain?.prev_page_url}
                    totalPages={portfolioMain?.last_page}
                    onPageSize={(v) => setPageSize(v)}
                />
            </div>

            <PortfolioModal
                isOpen={showModal}
                close={close}
                data={dataById}
                isLoading={isFetching}
            />
        </section>
    );
};

export default Portfolio;

const ItemLoader = () => {
    return <Placeholder height="80px" className="portfolio-item" />;
};
