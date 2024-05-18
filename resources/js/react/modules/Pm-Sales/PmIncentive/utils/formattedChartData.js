export const IncentiveFormattedData = (
    incentiveData,
    chartDataRangesForColor
) => {
    const data = incentiveData?.incentive_criterias?.map((item) => {
        return {
            title: item?.title,
            ideal: {
                id: item?.id,
                title: item?.title,
                yTitle: "Incentive percentage",
                chartTag: "Ideal",
                series: [
                    {
                        name: item?.title,
                        data: item?.incentive_factors?.map((item) =>
                            parseInt(item?.incentive_amount)
                        ),
                    },
                ],
                categories: item?.incentive_factors?.map(
                    (item) =>
                        `${parseInt(item?.lower_limit)}-${parseInt(
                            item?.upper_limit
                        )}%`
                ),
                range: chartDataRangesForColor?.find((r) => r?.id == item?.id)
                    ?.ranges,
            },
            achieved: null,
        };
    });
    return data;
};
