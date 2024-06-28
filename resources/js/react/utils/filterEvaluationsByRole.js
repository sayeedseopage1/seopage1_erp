const filterEvaluationsByRole = (evaluations, tableType) => {
    return evaluations?.filter((evaluation) => {
        switch (tableType) {
            case "Developer":
                return _.includes([14, 5], Number(evaluation.roleId));
            case "Project Manager":
                return _.includes([15, 4], Number(evaluation.roleId));
            case "Lead Developer":
                return _.includes([16, 6], Number(evaluation.roleId));
            case "Sales Executive":
                return _.includes([17, 7], Number(evaluation.roleId));
            default:
                return _.includes([14, 5], Number(evaluation.roleId));
        }
    });
};

export default filterEvaluationsByRole;
