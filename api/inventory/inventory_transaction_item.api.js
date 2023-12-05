
import axios from "../../helpers/axios"
//------------------------------ | INVENTORY TRANSACTION ITEM | ----------------------------------------

  //----------------------------GET method for the Users---------------
  export const getAllData = async (id) => {
    return axios
    .get(`/api/inventory_transaction_items/get-item-by-transaction-id?id=${id}`)
    .then((res) => {
        return res; 
    })
    .catch((err) => {
        return err.response;
    });
  };


    //----------------------------Adding of the Users---------------------------   
    export const addData = async (inventory_transaction_id, inventory_item_id, quantity, note) => {
      return axios
        .post("/api/inventory_transaction_items/create-inventory-transaction-items", { inventory_transaction_id, inventory_item_id, quantity, note })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
  
  
    export const getOne = async (id) => {
      return axios
        .get(`/api/inventory_transaction_items/get-one-data?id=${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/inventory_transaction_items/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const updateData = async (value) => {
      return axios
        .patch("/api/inventory_transaction_items/update-data", value)
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
            .get(`/api/inventory_items/for-dropdown`)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
        };
        