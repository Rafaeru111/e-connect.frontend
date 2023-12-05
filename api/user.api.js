import axios from "../helpers/axios"
import utils from '../helpers/utils'

//----------------------------GET method for the Users---------------
    export const getAllUser = async (page, pageSize) => {
        return axios
        .get(`/api/profile/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
    };

    

    export const getClientAllUser = async (page, pageSize) => {
      return axios
      .get(`/api/profile/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22role%22%3A+%22client%22%7D`)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
  };

    export const getEmployeeAllUser = async (page, pageSize) => {
      return axios
      .get(`/api/profile/?excludeFields=password%2Cotp_code&page=${page}&pageSize=${pageSize}&sort=-createdAt&query=%7B%22role%22%3A+%22employee%22%7D`)
      .then((res) => {
          return res;
      })
      .catch((err) => {
          return err.response;
      });
  };

    
//----------------------------Adding of the Users---------------------------   
    export const addData = async (firstName, lastName, email, mobileNumber, role) => {
        return axios
          .post("/api/profile/add_user", { firstName, lastName, email, mobileNumber, role})
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
    
      
    export const getOne = async (userId) => {
      return axios
        .get(`/api/profile/get-user-profile?userId=${userId}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    export const DeleteData = async (id) => {
      return axios
        .delete(`/api/profile/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };
    

    export const updateData = async (value) => {
      return axios
        .patch("/api/profile/update-data", value)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    };

    