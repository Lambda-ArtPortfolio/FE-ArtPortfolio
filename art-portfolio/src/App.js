import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'
import './App.css';

import PrivateRoute from "./components/PrivateRoute";

import CreatePost from './components/CreatePost';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import PostCard from './components/PostCard';
import React from 'react';
import './App.css';

//Component - Alexis
// import Login from './components/Login';
import AppRouter from './components/AppRouter';

function App() {
  const [list, setList] = useState([])
  useEffect (() => {
      const getPost = () => {
        axios({
          url:'https://art-portfolio-bw.herokuapp.com/art',
          method: 'get',
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then((res) => { 
            console.log(res, 'res')
           setList(res.data.portfolio.sort((a,b) => b.id - a.id));
        })
        .catch(err => {  
        })
      }
      getPost();
  
  }, [])
  
  
  const[postEdit, setPostEdit] = useState(null);
  const editPost = post => {
    const editIndex = list.indexOf(postEdit);
    const id = list[editIndex].id
    axios({
      url:`https://art-portfolio-bw.herokuapp.com/art/${id}`,
      method: 'put',
      headers: {
        Authorization: localStorage.getItem('token')
      },
      data:{
        image: post.image,
        description: post.description
       }
    })
    .then((res) => {
      setList(list.map((submission, index) => (index === editIndex ? res.data.portfolio : submission)))
    })
    .catch(err => {
    })
  }
  const deletePost = id => {
    axios({
      url:`https://art-portfolio-bw.herokuapp.com/art/${id}`,
      method: 'delete',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    .then((res) => {
      setList(list.filter(post => post.id !== id));
    })
    .catch(err => {
    })
  }





  return (
    <div className="App">
      <AppRouter />
      {/* <Login /> */}
    </div>
  )
}

export default App;
