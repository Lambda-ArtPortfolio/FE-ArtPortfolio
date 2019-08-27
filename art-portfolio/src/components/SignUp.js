import React, { useEffect, useContext } from 'react';
// import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {ArtistContext} from '../contexts/ArtistContext'
 
const backgroundStyie = {
  backgroundColor: 'white', textAlign: 'left',marginLeft: '10%', border: 'medium solid black',width: '300px'
}
const formStyle =
  {marginLeft: '33%'}
const welcomeStyle =
{marginLeft: '20%'}
const margin33Style =
{marginLeft: '33%'}
const margin1Style =
{marginLeft: '1%'}

function SignUpForm({ values, errors, touched, isSubmitting, handleSubmit, status }) {
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
        setArtist('')
      }
  return (
    <div style={backgroundStyie}>
<p style={welcomeStyle}>Welcome Photographer</p>
      <button style={{marginLeft: '33%'}} onClick={signOut}>Sign Out</button>
    <Form >
<p style={formStyle}>Sign Up</p>
<div style={margin33Style}>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="name" autoComplete="name" />
      </div>
      <div style={margin33Style}>
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field type="text" name="username" placeholder="username" autoComplete="username" />
      </div>
      <div style={margin33Style}>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" autoComplete="current-password" />
      </div>
      <button style={margin33Style} type='submit' disabled={isSubmitting}>Submit</button>

    </Form>
    <p style={margin1Style}>Glad to have you {artist ? ', '+artist : ''}</p>
</div>
  );
}

const SignUp = withFormik({
  
  mapPropsToValues({ name, username, password }) {
    return {
      name: name || "",
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2,"name not valid")
      .required("name is required"),
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
        console.log('post',res)
          localStorage.setItem('token',res.data.token)
        localStorage.setItem('username',res.data.userInfo.name)
        setStatus(res.data.userInfo.name);
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
