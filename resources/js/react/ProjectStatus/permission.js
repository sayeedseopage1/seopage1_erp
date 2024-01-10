export const hasDeletePermision = (auth, role) => {
    if (role === auth.getRoleId()) {
        return ture;
    }
    return false;
};
