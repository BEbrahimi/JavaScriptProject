function getRoleName(role){
    switch (Number(role)){
        case 0:
            return "You are logged in as a User";
        case 1:
            return "You are logged in as a Manager";
        case 2:
            return "You are logged in as a Editor";
        case 3:
            return "You are logged in as a Administrator.";
        default:
            return "You are logged in as a User";
    }
}

function getRoleLabel(role){
    switch (Number(role)){
        case 0:
            return "User";
        case 1:
            return "Manager";
        case 2:
            return "Editor";
        case 3:
            return "Administrator";
        default:
            return "User";
    }
}