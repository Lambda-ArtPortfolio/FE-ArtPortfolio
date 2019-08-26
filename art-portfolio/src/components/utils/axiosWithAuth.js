import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: "https://art-portfolio-bw.herokuapp.com",
        headers: {
            'Authorization': token,
            "Content-type": "application/json",

        }
    });
};


