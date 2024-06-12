export const formattedFactorData = (incentiveData) => {
    const data = incentiveData?.incentive_criterias?.map((criteria) => {
        return {
            id: criteria?.id,
            title: criteria?.title,
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
        };
    });

    const result = {
        id: data?.id,
        title: data?.title,
        factorsData: data?.categories?.map((category, index) => ({
            factorLimit: category,
            idealValue: data?.seriesData[index],
        })),
    };

    return result;
};
