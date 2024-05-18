export const IncentiveFormattedData = (
    incentiveData,
    chartDataRangesForColor
) => {
    const data = incentiveData?.incentive_criterias?.map((criteria) => {
        return {
            title: criteria?.title,
            ideal: {
                id: criteria?.id,
                title: criteria?.title,
                yTitle: "Incentive percentage",
                chartTag: "Ideal",
                series: [
                    {
                        name: criteria?.title,
                        data: criteria?.incentive_factors?.map((factor) =>
                            parseFloat(factor?.incentive_amount)
                        ),
                    },
                ],
                categories: criteria?.incentive_factors?.map(
                    (factor) =>
                        `${parseFloat(factor?.lower_limit)}-${
                            criteria?.id > 7 ? "$" : ""
                        }${parseFloat(factor?.upper_limit)}${
                            criteria?.id <= 7 ? "%" : ""
                        }`
                ),
                range: chartDataRangesForColor?.find(
                    (r) => r?.id == criteria?.id
                )?.ranges,
            },
            achieved: null,
        };
    });
    return data;
};
