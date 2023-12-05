import axios from "../../helpers/axios"

//------------------------------ | INVENTORY TRANSACTION  | ----------------------------------------

//----------------------------GET method for the Users---------------
    export const getAllData = async (page, pageSize) => {
        return axios
        .get(`/api/inventory_transaction/?page=${page}&pageSize=${pageSize}&sort=-createdAt`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    
//----------------------------Adding of the Users---------------------------   
    export const addData = async (transaction_type, transaction_date, note) => {
        return axios
          .post("/api/inventory_transaction/create-inventory-transaction", { transaction_type, transaction_date, note })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
    
      
    export const getOne = async (id) => {
      return axios
        .get(`/api/inventory_transaction/get-one-data?id=${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/inventory_transaction/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const updateData = async (value) => {
      return axios
        .patch("/api/inventory_transaction/update-data", value)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

