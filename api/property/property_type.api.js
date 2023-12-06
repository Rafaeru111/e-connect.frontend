import axios from "../../helpers/axios"

//------------------------------ | INVENTORY CATEGORY | ----------------------------------------

//----------------------------GET method for the Users---------------
    export const getAllData = async (page, pageSize) => {
        return axios
        .get(`/api/property_type/?page=${page}&pageSize=${pageSize}&sort=-createdAt`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

//----------------------------Adding of the Users---------------------------   
    export const addData = async (property_type_name, property_type_description) => {
        return axios
          .post("/api/property_type/create-property-type", { property_type_name, property_type_description})
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
    
      
    export const getOne = async (id) => {
      return axios
        .get(`/api/property_type/get-one-data?id=${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/property_type/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const updateData = async (value) => {
      return axios
        .patch("/api/property_type/update-data", value)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    