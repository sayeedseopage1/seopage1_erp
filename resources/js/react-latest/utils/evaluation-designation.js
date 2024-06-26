const evaluationDesignation = (rollId) => {
    switch (rollId) {
        case 4:
        case 15:
            return "New Project Manager";

        case 5:
        case 14:
            return "New Developer";

        case 6:
        case 16:
            return "New Lead Developer";

        case 7:
        case 17:
            return "New Sales Executive";

        default:
            return "";
    }
};

export default evaluationDesignation;
