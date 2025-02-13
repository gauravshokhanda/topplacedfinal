export const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  
  export const getUser = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
  };
  
  export const isAuthenticated = () => {
    return !!getUser();
  };
  