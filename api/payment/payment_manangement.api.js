import axios from "../../helpers/axios"

//------------------------------ | Payment Management | ----------------------------------------

//----------------------------GET method for the Users---------------
    export const getAllData = async (page, pageSize, status) => {
        return axios
        .get(`/api/payment/?page=${page}&pageSize=${pageSize}&sort=-createdAt`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    export const Pending = async (page, pageSize) => {
        return axios
        .get(`/api/payment/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22payment_status%22%3A+%22pending%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    export const Processing = async (page, pageSize) => {
      return axios
      .get(`/api/payment/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22payment_status%22%3A+%22processing%22%7D`)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
  };


  export const Complete = async (page, pageSize) => {
    return axios
    .get(`/api/payment/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22payment_status%22%3A+%22completed%22%7D`)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        return err.response;
    });
};


export const Partial = async (page, pageSize) => {
  return axios
  .get(`/api/payment/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22payment_status%22%3A+%22partially%22%7D`)
  .then((res) => {
      return res;
  })
  .catch((err) => {
      return err.response;
  });
};


export const Canceled = async (page, pageSize) => {
  return axios
  .get(`/api/payment/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22payment_status%22%3A+%22cancelled%22%7D`)
  .then((res) => {
      return res;
  })
  .catch((err) => {
      return err.response;
  });
};

export const Failed = async (page, pageSize) => {
  return axios
  .get(`/api/payment/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22payment_status%22%3A+%22failed%22%7D`)
  .then((res) => {
      return res;
  })
  .catch((err) => {
      return err.response;
  });
};


export const Expired = async (page, pageSize) => {
  return axios
  .get(`/api/payment/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22payment_status%22%3A+%22expired%22%7D`)
  .then((res) => {
      return res;
  })
  .catch((err) => {
      return err.response;
  });
};

export const Refunded = async (page, pageSize) => {
  return axios
  .get(`/api/payment/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22payment_status%22%3A+%22refunded%22%7D`)
  .then((res) => {
      return res;
  })
  .catch((err) => {
      return err.response;
  });
};








//----------------------------Adding of the Payment---------------------------   

    export const addData = async (category_name, category_description) => {
        return axios
          .post("/api/payment/create-inventory-category", { category_name, category_description})
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
    
      
    export const getOne = async (id) => {
      return axios
        .get(`/api/payment/get-one-data?id=${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/payment/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const statusChange = async (id, status) => {
      return axios
        .patch("/api/payment/status-change", {id, status})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    