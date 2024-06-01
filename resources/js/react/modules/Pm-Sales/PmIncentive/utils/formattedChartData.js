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

    return shortTitle.slice(0, 5);
}

function createIncentiveArray(arr, incentive) {
    // Create a new array with the same length as the input array, initialized with zeros
    let newArr = new Array(arr.length).fill(0);

    // Iterate over the input array
    for (let i = 0; i < arr.length; i++) {
        // If the current element matches the incentive, place it in the new array at the same index
        if (arr[i] == parseFloat(incentive)) {
            newArr[i] = parseFloat(incentive);
        }
    }

    return newArr;
}

export const IncentiveFormattedData = (incentiveData) => {
    const data = incentiveData?.incentive_criterias?.map((criteria) => {
        return {
            id: criteria?.id,
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
                amountType:
                    criteria?.incentive_factors[0]?.incentive_amount_type,
                series: [
                    {
                        name: criteria?.title,
                        data: criteria?.incentive_factors?.map((factor) =>
                            parseFloat(factor?.incentive_amount)
                        ),
                    },
                ],
                seriesData: criteria?.incentive_factors?.map((factor) =>
                    parseFloat(factor?.incentive_amount)
                ),
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
                amountType:
                    criteria?.incentive_factors[0]?.incentive_amount_type,
                limitType: criteria?.incentive_factors?.[0]?.limit_type,
                series: [
                    {
                        name: criteria?.title,
                        data: createIncentiveArray(
                            criteria?.incentive_factors?.map((factor) =>
                                parseFloat(factor?.incentive_amount)
                            ),
                            criteria?.obtained_incentive
                        ),
                    },
                ],
                incentive_factors: criteria?.incentive_factors,
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
            },
        };
    });
    return data;
};
