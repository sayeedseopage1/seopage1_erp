import { useGetIncentiveFactorsQuery } from "../../../../services/api/Pm-Sales/PmIncentiveApiSlice";

const useIncentiveTypes = () => {
    const { data: incentiveTypes, isLoading: incentiveTypesLoading } = useGetIncentiveFactorsQuery();
    const incentiveTypesData = incentiveTypes?.data;

    const regularIncentiveTypes = incentiveTypesData?.find((item) => item?.id == 1);
    const upSaleCrossSaleTypes = incentiveTypesData?.find((item) => item?.id == 2);
    const bonusIncentiveTypes = incentiveTypesData?.find((item) => item?.id == 3);

    return { regularIncentiveTypes, upSaleCrossSaleTypes, bonusIncentiveTypes, incentiveTypesLoading }
};

export default useIncentiveTypes;

const apiDataSample = {
    "id": 1,
    "incentive_type_id": 1,
    "title": "Revision vs Task ratio",
    "created_at": null,
    "updated_at": null,
    "incentive_factors": [
        {
            "id": 1,
            "incentive_criteria_id": 1,
            "lower_limit": "0.00",
            "upper_limit": "10.00",
            "incentive_amount_type": 2,
            "incentive_amount": "100.00",
            "created_at": null,
            "updated_at": null
        },
        {
            "id": 2,
            "incentive_criteria_id": 1,
            "lower_limit": "10.00",
            "upper_limit": "20.00",
            "incentive_amount_type": 2,
            "incentive_amount": "80.00",
            "created_at": null,
            "updated_at": null
        },
        {
            "id": 3,
            "incentive_criteria_id": 1,
            "lower_limit": "20.00",
            "upper_limit": "35.00",
            "incentive_amount_type": 2,
            "incentive_amount": "50.00",
            "created_at": null,
            "updated_at": null
        },
        {
            "id": 4,
            "incentive_criteria_id": 1,
            "lower_limit": "30.00",
            "upper_limit": "50.00",
            "incentive_amount_type": 2,
            "incentive_amount": "0.00",
            "created_at": null,
            "updated_at": null
        },
        {
            "id": 5,
            "incentive_criteria_id": 1,
            "lower_limit": "50.00",
            "upper_limit": "65.00",
            "incentive_amount_type": 2,
            "incentive_amount": "0.00",
            "created_at": null,
            "updated_at": null
        },
        {
            "id": 6,
            "incentive_criteria_id": 1,
            "lower_limit": "65.00",
            "upper_limit": "80.00",
            "incentive_amount_type": 2,
            "incentive_amount": "0.00",
            "created_at": null,
            "updated_at": null
        },
        {
            "id": 7,
            "incentive_criteria_id": 1,
            "lower_limit": "80.00",
            "upper_limit": "100.00",
            "incentive_amount_type": 2,
            "incentive_amount": "0.00",
            "created_at": null,
            "updated_at": null
        }
    ]
}

export const idealVsAchievedChartData = [
    {
        id: 1,
        title: "Revision Vs Task ratio",
        ideal: {
            id: 1,
            refId: 1,
            title: "Revision Vs Task ratio",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Revision vs task ratio",
                    data: [100, 80, 50, 10, 10, 10, 10],
                },
            ],
            categories: [
                "0-10%",
                "11-20%",
                "21-35%",
                "36-50%",
                "51-65%",
                "66-80%",
                "81-100%",
            ],
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 100,
                    color: "#14B96A",
                },
            ],
        }
    },
];