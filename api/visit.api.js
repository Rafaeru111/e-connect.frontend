import axios from "../helpers/axios"

//------------------------------ | INVENTORY ITEM | ----------------------------------------


//----------------------------GET method for the Users---------------
    export const Pending = async (page, pageSize) => {
        return axios
        .get(`/api/visit_appointment/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22pending%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    export const Verified = async (page, pageSize) => {
        return axios
        .get(`/api/visit_appointment/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22verified%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    export const Cancelled = async (page, pageSize) => {
        return axios
        .get(`/api/visit_appointment/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22cancelled%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };
    export const Visited = async (page, pageSize) => {
        return axios
        .get(`/api/visit_appointment/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22visited%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };
  
//----------------------------Adding of the Users---------------------------   
    export const addData = async (property_id, visit_date,  client_id) => {
        return axios
          .post("/api/visit_appointment/create-visit-application-as-admin", { property_id, visit_date,  client_id})
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
 
    export const getOne = async (id) => {
      return axios
        .get(`/api/visit_appointment/get-one-data?id=${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/visit_appointment/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const updateData = async (value) => {
      return axios
        .patch("/api/visit_appointment/update-data", value)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };



    //------------|For Category Drop Down|-----------------

   
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
        .patch("/api/visit_appointment/status-change", {id, status})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const toVerify = async (id) => {
      return axios
        .patch("/api/visit_appointment/to-verify", {id})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    //----------------------------Adding of the Users---------------------------   
    export const addDataAsClient = async (visit_date,property_id) => {
      return axios
        .post("/api/visit_appointment/create-visit-application", { visit_date,property_id})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const tryVerify = async (reference_code) => {
      return axios
        .patch("/api/visit_appointment/verify-visit", {reference_code})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
