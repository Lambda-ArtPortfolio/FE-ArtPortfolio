import React, { useEffect, useContext } from 'react';
// import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {ArtistContext} from '../contexts/ArtistContext'
import { Context, Header, LoginBtn } from './StyledWidgets';
import '../App.css'

// const backgroundStyie = {
//   backgroundColor: 'white', textAlign: 'left',marginLeft: '10%', border: 'medium solid black',width: '300px'
// }
let formStyle =
  {marginLeft: '33%'}
const margin33Style =
{marginLeft: '33%'}
const marginWStyle =
{marginLeft: '40%', width: '20%'}
const margin1Style =
{marginLeft: '1%'}

formStyle = {
    backgroundColor: '#DCDCDC',
    margin: '0 auto',
    marginTop: '30px',
    border: '2px solid #E3E1E1',
    borderRadius: '12px',
    boxShadow: '5px 5px 8px #BFBFBF',
    width: '50%',
    alignItems: 'center',
    height: '500px',
    display: 'flex',
    justifyContent: 'center'
}

function SignUpForm({ values, errors, touched, isSubmitting, handleSubmit, status }) {
  const { artist, setArtist } = useContext(ArtistContext);
  useEffect(() => {
    if (status) {
      console.log('status',status)
      setArtist(status);
    }
  }, [status,setArtist]);
      function signOut () {
        localStorage.setItem('token','')
        localStorage.setItem('username','')
        setArtist('')
      }
  return (
<div className='crossed' style={formStyle}>
<div>
      
                      <Context>
                    <Header>
                    <div style={{color: 'black', fontSize: '32px'}}>Display Your Art</div >
                    <div style={{color: 'black'}}>We'll Do The Rest</div >
                    </Header>

      <button style={marginWStyle} onClick={signOut}>Sign Out</button>
    <Form>
<div style={margin33Style}>Name
        {touched.name && errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
        <Field type="text" name="name" placeholder="name" autoComplete="name" />
      </div>
      <div style={margin33Style}>Username
        {touched.username && errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
        <Field type="text" name="username" placeholder="username" autoComplete="username" />
      </div>
      <div style={margin33Style}>Password
        {touched.password && errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" autoComplete="current-password" />
      </div>
      <LoginBtn style={margin33Style} type='submit' disabled={isSubmitting}>Sign UP</LoginBtn>

    </Form>
    <p style={margin1Style}>Glad to have you {artist ? ', '+artist : ''}</p>
    </Context>
</div>
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
