import { createContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

// API
import { usePriceQuotationsFilterOptionsQuery } from "../../../../services/api/priceQuotationsApiSlice";
import { AccountListDummyData } from "../constant";

export const PriceQuotationsContext = createContext({});

const PriceQuotationsProvider = ({ children }) => {
    const [filterOptions, setFilterOptions] = useState({});

    const { data: filterOptionsData, isLoading: filterOptionsLoading } =
        usePriceQuotationsFilterOptionsQuery("", {
            refetchOnMountOrArgChange: true,
        });

    useEffect(() => {
        if (filterOptionsData && !filterOptionsLoading) {
            const { data } = filterOptionsData;
            // CMS
            const cmsFormatted = data?.project_cms?.map((item) => {
                return {
                    ...item,
                    name: item.cms_name,
                };
            });

            const currenciesFormatted = data?.currencies?.map((item) => {
                return {
                    ...item,
                    name: item.currency_code,
                };
            });

            const freelancerACcount = AccountListDummyData.filter((item) =>
                item?.platform?.name
                    ?.toLocaleLowerCase()
                    ?.includes("freelancer")
            )
                .map((item) => {
                    return {
                        ...item,
                        name: item?.user_name,
                    };
                })
                .slice(0, 3);

            freelancerACcount.unshift({
                id: 515,
                name: "All",
                value: "all",
            });

            setFilterOptions({
                cms: cmsFormatted,
                currencies: currenciesFormatted,
                accounts: freelancerACcount,
            });
        }
    }, [filterOptionsData, filterOptionsLoading]);

    // Value
    const PriceQuotationsValue = useMemo(() => {
        return {
            filterOptions,
            filterOptionsLoading,
        };
    });

    return (
        <PriceQuotationsContext.Provider value={PriceQuotationsValue}>
            {children}
        </PriceQuotationsContext.Provider>
    );
};

export default PriceQuotationsProvider;

PriceQuotationsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
