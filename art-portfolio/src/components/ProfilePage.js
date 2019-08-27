import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import UserProfile from "./UserProfile";

const ProfilePage = (post) => {
  const [profilePage, setProfilePage] = useState([]);


  useEffect(() => {
  
    axiosWithAuth()
    .get("/art")
    .then(res => {
        setProfilePage(res.data)
        console.log("res",res)
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }, []);

  return (
  <div>
   <ul>
       {profilePage.map(item => (
    <li key = {item.id}>   
      <img src= {item.image} alt= ''/>
      <p>{item.description}</p>
     </li>
     ))} 
  </ul>
  </div>
  );
};

export default ProfilePage;