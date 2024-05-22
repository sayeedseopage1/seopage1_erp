function convertToShortTitle(title) {
    if (title.includes(" < 6000")) {
        title = title.replace(" < 6000", "");
    }
    if (title.includes(" > 6000")) {
        title = title.replace(" > 6000", "");
    }
    // Split the title by spaces to get individual words
    const words = title.split(" ");

    // Map each word to its first character and join them with dots
    const shortTitle = words.map((word) => word[0].toUpperCase()).join(".");

    return shortTitle;
}

export const IncentiveFormattedData = (incentiveData) => {
    const data = incentiveData?.incentive_criterias?.map((criteria) => {
        return {
            title: criteria?.title,
            ideal: {
                id: criteria?.id,
                title: criteria?.title,
                yTitle: `${
                    criteria?.title.includes("Bonus points")
                        ? "Bonus Points"
                        : "Incentive percentage"
                }`,
                chartTag: "Ideal",
                amountType: criteria?.incentive_amount_type,
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
                            parseFloat(factor?.limit_type) == 1 ? "$" : ""
                        }${upperLimit}${
                            parseFloat(factor?.limit_type) == 2 ? "%" : ""
                        }`;
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
                yTitle: `${
                    criteria?.title.includes("Bonus points")
                        ? "Bonus Points"
                        : "Incentive percentage"
                }`,
                chartTag: "Achieved",
                incentive: criteria?.obtained_incentive,
                ratio: criteria?.acquired_percent,
                shortTitle: convertToShortTitle(criteria?.title),
            },
        };
    });
    return data;
};

// export const statsInfoData = (incentiveData) => {
//     const data = incentiveData?.incentive_criterias?.map((criteria) => {
//         return {
//             average:null,
//             stats_info:[
//                 criteria?.incentive_factors?.map((factor) =>
//                     parseFloat(factor?.incentive_amount)
//                 ),
//             ]
//         };
//     });
//     return data;
// };
