import axios from "axios";

 export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

   return axios.create({
    baseURL: "https://art-portfolio-bw.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
};