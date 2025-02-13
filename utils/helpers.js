export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  