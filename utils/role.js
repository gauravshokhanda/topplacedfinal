export const hasAccess = (user, allowedRoles) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };
  
  export const redirectToDashboard = (user) => {
    if (!user) return "/login";
    return user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";
  };
  