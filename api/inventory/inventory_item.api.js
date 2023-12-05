import axios from "../../helpers/axios"

//------------------------------ | INVENTORY ITEM | ----------------------------------------


//----------------------------GET method for the Users---------------
    export const getAllData = async (page, pageSize) => {
        return axios
        .get(`/api/inventory_items/?page=${page}&pageSize=${pageSize}&sort=-createdAt`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    
//----------------------------Adding of the Users---------------------------   
    export const addData = async (inventory_category_id, inventory_name, description, stock_onhand) => {
        return axios
          .post("/api/inventory_items/create-inventory-items", { inventory_category_id, inventory_name, description, stock_onhand })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
 
    export const getOne = async (id) => {
      return axios
        .get(`/api/inventory_items/get-one-data?id=${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/inventory_items/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const updateData = async (value) => {
      return axios
        .patch("/api/inventory_items/update-data", value)
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
        .get(`/api/inventory_category/for-dropdown`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };
    
    