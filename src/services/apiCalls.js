
import axios from "axios";

const API_URL = "http://localhost:3000/api/"


export const loginUsers = (data) => {
    return axios 
    .post(`${API_URL}users/login`,data)   
    .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        return err;
      });
}



