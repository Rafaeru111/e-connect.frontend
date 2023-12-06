import axios from "../helpers/axios"

//------------------------------ | Client Application | ----------------------------------------

//----------------------------GET method for the Users---------------
    export const getAllData = async (page, pageSize) => {
        return axios
        .get(`/api/client_application/?page=${page}&pageSize=${pageSize}&sort=-createdAt`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

//----------------------------Adding of the Users---------------------------   
    export const addData = async (category_name, category_description) => {
        return axios
          .post("/api/client_application/create-application", { category_name, category_description})
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
        .delete(`/api/inventory_category/${id}`)
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

    