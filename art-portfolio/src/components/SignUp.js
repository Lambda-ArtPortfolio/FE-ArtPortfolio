import React, { useState, useEffect, useContext } from 'react';
// import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {ArtistContext} from '../contexts/ArtistContext'
 
function SignUpForm({ values, errors, touched, isSubmitting, handleSubmit, status }) {
  const [users, setUsers] = useState([])
  const { artist, setArtist } = useContext(ArtistContext);
  useEffect(() => {
    if (status) {
      console.log('status',status)
      setArtist(status);
    }
  }, [status]);
      function signOut () {
        localStorage.setItem('token','')
        localStorage.setItem('username','')
      }
  return (
    <div style={{backgroundColor: 'white', textAlign: 'left',marginLeft: '10%', border: 'medium solid black',width: '300px'}}>
<p style={{marginLeft: '20%'}}>Welcome Photographer</p>
      <button style={{marginLeft: '33%'}} onClick={signOut}>Sign Out</button>
    <Form >
<p style={{marginLeft: '33%'}}>Sign Up</p>
      <div style={{marginLeft: '33%'}}>
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field type="text" name="username" placeholder="username" autoComplete="username" />
      </div>
      <div style={{marginLeft: '33%'}}>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" autoComplete="current-password" />
      </div>
      <button style={{marginLeft: '33%'}} type='submit' disabled={isSubmitting}>Submit</button>

    </Form>
<p style={{marginLeft: '1%'}}>Glad to have you {localStorage.getItem('username') ? ', '+localStorage.getItem('username') : ''}</p>
</div>
  );
}

const SignUp = withFormik({
  
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(2,"username not valid")
      .required("username is required"),
    password: Yup.string()
      .min(2, "Password must be 2 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    if (values.username === "alreadytaken@atb.dev") {
      setErrors({ username: "That username is already taken" });
    } else {
    axios
      .post("https://art-portfolio-bw.herokuapp.com/auth/register", values)
      .then(res => {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('username',res.data.added.username)
        setStatus(res.data.added.username);
        axios
 .get("https://art-portfolio-bw.herokuapp.com/")
 .then(res => {
  console.log('get res',res)
  console.log('get res.data',res.data)
// setStatus(res.data);
     setSubmitting(false);
   })
   .catch(err => {
     console.log('get',err); // There was an error creating the data and logs to console
     setSubmitting(false);
   });
          setSubmitting(false);
        })
        .catch('post',err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(SignUpForm);

export default SignUp;
