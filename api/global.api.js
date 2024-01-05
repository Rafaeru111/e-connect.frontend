import axios from "../helpers/axios"

// Function to handle file upload
export const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append('categoryImage', file);

  try {
    const response = await axios.post('https://econnect-api.orientaldevs.com/e-connect-api2/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response; // Return the response when upload is successful
  } catch (error) {
    throw error; // Re-throw the error to handle it in the caller
  }
};




export const checkToken = async (token) => {
  return axios
    .post("/api/auth/check-token", { token})
    .then((res) => {
      return res; 
    })
    .catch((err) => {
      return err.response;
    });
};



export const getMyProfile = async () => {
  return axios
    .post("/api/profile/get-my-profile",{})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};




// this service is used for upload







