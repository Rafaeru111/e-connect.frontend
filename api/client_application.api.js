import axios from "../helpers/axios"

//------------------------------ | Client Application | ----------------------------------------

//----------------------------GET method for the Users---------------
    export const Pending = async (page, pageSize) => {
        return axios
        .get(`/api/client_application/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22pending%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    export const Accepted = async (page, pageSize) => {
      return axios
      .get(`/api/client_application/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22accepted%22%7D`)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
  };

  export const Denied = async (page, pageSize) => {
    return axios
    .get(`/api/client_application/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22denied%22%7D`)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        return err.response;
    });
};
//----------------------------Adding of the Users---------------------------   
    export const addData = async (property_item_id, application_type, application_date, client_id) => {
        return axios
          .post("/api/client_application/create-application-as-admin", { property_item_id, application_type, application_date, client_id})
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
    
      
    export const getOne = async (id) => {
      return axios
        .get(`/api/client_application/get-one-data?id=${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/client_application/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const updateData = async (value) => {
      return axios
        .patch("/api/client_application/update-data", value)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };


    export const dropProperty = async () => {
      return axios
        .get(`/api/property_items/for-dropdown`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    }; 

    export const dropClient = async () => {
      return axios
        .get(`/api/profile/for-dropdown`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    }; 

    export const statusChange = async (id, status) => {
      return axios
        .patch("/api/client_application/status-change", {id, status})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    
    