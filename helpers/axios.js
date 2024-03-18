import axios from "axios";


//Local Host's Backend        baseURL:     baseURL: `https://econnect-api.mjc-econnect.com/`,
// baseURL: `http://localhost:3004/`,
//baseURL: `https://econnect-api.mjc-econnect.com/`,
let instance = axios.create({
    
  //baseURL: `http://localhost:3000/`,
  baseURL: `https://econnect-api.mjc-econnect.com/`,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  //headers will get the token with the Z
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

//Interceptors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 403 || status === 401) {
      // remove token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login/login";
    }
    return Promise.reject(error);
  }
);

export default instance;