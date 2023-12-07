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
        .get(`/api/visit_appointment/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22pending%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    export const Cancelled = async (page, pageSize) => {
        return axios
        .get(`/api/visit_appointment/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22sold%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };
    export const Visited = async (page, pageSize) => {
        return axios
        .get(`/api/visit_appointment/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22sold%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };


    
//----------------------------Adding of the Users---------------------------   
    export const addData = async (visit_date, property_id) => {
        return axios
          .post("/api/visit_appointment/create-visit-application", { visit_date, property_id, })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
 
    export const getOne = async (id) => {
      return axios
        .get(`/api/property_items/get-one-data?id=${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/property_items/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const updateData = async (value) => {
      return axios
        .patch("/api/property_items/update-data", value)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };



    //------------|For Category Drop Down|-----------------

    export const forDropdown = async () => {
        return axios
        .get(`/api/property_type/for-dropdown`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };
    
    
    export const statusChange = async (id, status) => {
      return axios
        .patch("/api/property_items/status-change", {id, status})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
