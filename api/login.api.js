import axios from "../helpers/axios"

      export const login = async (email, password) => {
        return axios
          .post("/api/auth/login", {email, password})
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };

      export const otp = async (otp) => {
        return axios
          .post("/api/auth/otp-code", {otp})
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };

      export const resendOtp = async (email) => {
        return axios
          .get(`/api/auth/resend-code?email=${email}`)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
      };
      
      