import React, { useEffect, useContext } from 'react';
// import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {ArtistContext} from '../contexts/ArtistContext'
import { Context, Header, LoginBtn } from './StyledWidgets';

// const backgroundStyie = {
//   backgroundColor: 'white', textAlign: 'left',marginLeft: '10%', border: 'medium solid black',width: '300px'
// }
let formStyle =
  {marginLeft: '33%'}
const margin33Style =
{marginLeft: '33%', color: 'white'}
// const marginWStyle =
// {marginLeft: '40%', width: '20%'}
const margin1Style =
{marginLeft: '1%', fontStyle: 'oblique', color: 'white'}

formStyle = {
  backgroundImage:
  `linear-gradient(to top, rgba(81,0,0,0), rgba(81,6,102,1)),
  url('https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/68680488_10158110637571323_2872412301510574080_o.jpg?_nc_cat=109&_nc_oc=AQlKM8gAcXdVTYfaO7VQPB4jj5psofWNDVsWZaqS7ga73viH3q6JdsX6N1kS7HkMp2DFgwqXw5RJQt223U9wGWT7&_nc_ht=scontent-iad3-1.xx&oh=ef3c44753a30d5188ee82e1b1036112e&oe=5E022BA6')`,
    backgroundColor: '#DCDCDC',
    margin: '0 auto',
    marginTop: '80px',
    border: '2px solid #E3E1E1',
    borderRadius: '12px',
    boxShadow: '5px 5px 8px #BFBFBF',
    width: '30%',
    minWidth: '300px',
    alignItems: 'center',
    height: '360px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '100px'
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
<div style={formStyle}>
<div>
      
                      <Context>
                    <Header>
                    <div style={{color: 'white', fontSize: '32px'}}>Display Your Art</div >
                    <div style={{color: 'white'}}>We'll Do The Rest</div >
                    </Header>

      {/* <button style={marginWStyle} onClick={signOut}>Sign Out</button> */}
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
      <LoginBtn style={margin33Style} type='submit' disabled={isSubmitting}>Sign Up</LoginBtn>

    </Form>
    </Context>
    <div style={margin1Style}><div>Glad to have you</div><div>{artist ? artist : ''}</div></div>
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
      .min(2,"* Name is not valid")
      .required("* Name is required"),
      username: Yup.string()
      .min(2,"* Username is not valid")
      .required("* Username is required"),
    password: Yup.string()
      .min(2, "* Password must be 2 characters or longer")
      .required("* Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus, props }) {
    if (values.username === "alreadytaken@atb.dev") {
      setErrors({ username: "* Username is already taken" });
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
    console.log('history',props.history)
    // setStatus(res.data);
      setSubmitting(false);
      props.history.push('/login');
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
