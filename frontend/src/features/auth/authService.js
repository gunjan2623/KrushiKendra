import axios from 'axios'

const API_URL ='http://localhost:5000/'

const register = async (data) => {
  console.log(data);
  const response = await axios.post(API_URL + "userupload", data);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  
  }

  return response.data;
};
const login = async (userData) => {
    const response = await axios.post(API_URL + "loginuser", userData);
  
    if (response.data) {
    const senddata=JSON.stringify( response.data);
      localStorage.setItem("user",senddata);
    }
  
    return response.data;
  };
  
  // Logout user
  const logout = () => {
    localStorage.removeItem("user");
  };
  
  const authService = {
    register,
    logout,
    login,
  };
  
  export default authService;
  