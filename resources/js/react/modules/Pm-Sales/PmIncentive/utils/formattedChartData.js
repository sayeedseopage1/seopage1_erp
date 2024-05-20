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
                amountType:
                    criteria?.incentive_factors?.[0]?.incentive_amount_type,
                series: [
                    {
                        name: criteria?.title,
                        data: criteria?.incentive_factors?.map((factor) =>
                            parseFloat(factor?.incentive_amount)
                        ),
                    },
                ],
                categories: criteria?.incentive_factors?.map(
                    (factor, index, array) => {
                        const isLastFactor = index === array?.length - 1;
                        const lowerLimit = parseFloat(factor?.lower_limit);
                        const upperLimit = parseFloat(factor?.upper_limit);

                        if (isLastFactor && lowerLimit === upperLimit) {
                            return `${lowerLimit}-Higher`;
                        }

                        return `${lowerLimit}-${
                            criteria?.id > 7 ? "$" : ""
                        }${upperLimit}${criteria?.id <= 7 ? "%" : ""}`;
                    }
                ),
                /* categories: criteria?.incentive_factors?.map(
                    (factor) =>
                        `${parseFloat(factor?.lower_limit)}-${
                            criteria?.id > 7 ? "$" : ""
                        }${parseFloat(factor?.upper_limit)}${
                            criteria?.id <= 7 ? "%" : ""
                        }`
                ), */
                // range: chartDataRangesForColor?.find(
                //     (r) => r?.id == criteria?.id
                // )?.ranges,
            },
            achieved: null,
        };
    });
    return data;
};
