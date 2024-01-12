import axios from "../../helpers/axios"

//------------------------------ | INVENTORY ITEM | ----------------------------------------


//----------------------------GET method for the Users---------------
    export const Available = async (page, pageSize) => {
        return axios
        .get(`/api/property_items/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22available%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    export const Pending = async (page, pageSize) => {
        return axios
        .get(`/api/property_items/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22pending%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    export const Sold = async (page, pageSize) => {
        return axios
        .get(`/api/property_items/?page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22status%22%3A+%22sold%22%7D`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    
//----------------------------Adding of the Users---------------------------   
    export const addData = async (property_type_id, property_name, property_description,property_specs, property_image,property_video, starting_at) => {
        return axios
          .post("/api/property_items/create-property", { property_type_id, property_name, property_description,property_specs, property_image,property_video, starting_at })
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
