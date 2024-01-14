import {
  Tag
} from "antd";
import Compressor from 'compressorjs';
import { getOne } from "../api/user.api";

//-------------------------------------| Functions |-------------------------------------

const convertDate = (createdAt) => {
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString(undefined, options);
}


const roleTag = (role) =>{

      let color;
            switch (role) {
              case "admin":
                color = "green";
                break;
              case "client":
                color = "volcano";
                break;
              case "employee":
                color = "blue";
                break;
              default:
                color = "default"; // Set a default color for unknown roles
                break;
            }

            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
}


const statusTag = (status) =>{

  let color;
        switch (status) {
          case "pending":
            color = "#FFE600";
            break;
          case "processing":
            color = "#87CEEB"; 
            break;
          case "completed":
            color = "#228B22"; 
            break;
          case "failed":
            color = "#B22222"; 
            break;
          case "refunded":
            color = "#808080"; 
            break;
          case "partially":
            color = "#FFD800"; 
            break;
          case "cancelled":
            color = "#708090"; 
            break;
          case "expired":
            color = "#D8BFD8";
            break;
          default:
            color = "default"; // Set a default color for unknown statuses
            break;
        }

        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      }


      //compress the file using compressor

      const compressFile = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.5, // Adjust the quality as needed
                success(result) {
                    resolve(result);
                },
                error(error) {
                    reject(error);
                },
            });
        });
    };


    
  module.exports = {
    convertDate,
    roleTag,
    statusTag,
    compressFile,
};

