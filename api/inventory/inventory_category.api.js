import axios from "../../helpers/axios"

//------------------------------ | INVENTORY CATEGORY | ----------------------------------------

//----------------------------GET method for the Users---------------
    export const getAllData = async (page, pageSize) => {
        return axios
        .get(`/api/inventory_category/?page=${page}&pageSize=${pageSize}&sort=-createdAt`)
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
          .post("/api/inventory_category/create-inventory-category", { category_name, category_description})
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
    
      
    export const getOne = async (id) => {
      return axios
        .get(`/api/inventory_category/get-one-data?id=${id}`)
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
        .patch("/api/inventory_category/update-data", value)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    