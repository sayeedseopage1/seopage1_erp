function convertToShortTitle(title) {
    // Split the title by spaces to get individual words
    const words = title.split(" ");

    // Map each word to its first character and join them with dots
    const shortTitle = words.map((word) => word[0].toUpperCase()).join(".");

    return shortTitle;
}

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
            achieved: {
                id: criteria?.id,
                title: criteria?.title,
                yTitle: "Incentive percentage",
                chartTag: "Achieved",
                incentive: criteria?.obtained_incentive,
                ratio: criteria?.acquired_percent,
                shortTitle: convertToShortTitle(criteria?.title),
            },
        };
    });
    return data;
};
