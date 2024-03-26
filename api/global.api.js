import axios from "../helpers/axios"

// Function to handle file upload
export const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append('categoryImage', file);

  try {
    const response = await axios.post('https://econnect-api.mjc-econnect.com/upload', formData, {
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


export const getUsers = async () => {
  return axios
    .get("/api/conversation/get-users")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};


export const sendingMessage = async (message, groupId) => {
  return axios
    .post("/api/conversation/send-message",{message, groupId})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};


export const getChat = async (groupId) => {
  return axios
    .get(`/api/conversation/get-my-convos?groupId=${groupId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};


export const getDashboard = async () => {
  return axios
    .get(`/api/profile/get-dashboard`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};


export const getVisitorsToday = async () => {
  return axios
    .get(`/api/visit_appointment/get-only-today`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getBarData = async () => {
  return axios
    .get(`/api/visit_appointment/get-weekly-data`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getPopData = async () => {
  return axios
    .get(`/api/viewed_properties/get-top-five-for-admin`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};




// this service is used for upload







