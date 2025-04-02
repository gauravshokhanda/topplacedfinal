
export const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  
  export const getUser = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user")) || null;
    }
    return null;
  };
  
  export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      return !!getUser();
    }
    return false;
  };
  