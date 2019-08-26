import React, { useState, useEffect } from 'react';
// import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


function SignUpForm({ values, errors, touched, isSubmitting, handleSubmit, status }) {
  const [users, setUsers] = useState([])
  // console.log('users up',users);
  // console.log('status up',status);

// 2: {name: "Collard Greens with Kimchi", course: "Side", technique
  useEffect(() => {
    if (status) {
      setUsers(status);
    }
  }, [status]);
function myFunction(arr) {
   // console.log(arr[0])
let dat = ' '
    arr.map((item,ix) => (
     dat = dat + item +  (( ix === arr.length-1) ? '' : ', ')
    )
         )
return  dat
        }
  return (
    <div style={{backgroundColor: 'white'}}>
Welcome Photographer
    <Form >
      <div>
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field type="text" name="username" placeholder="username" autoComplete="username" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" autoComplete="current-password" />
      </div>
      <button type='submit' disabled={isSubmitting}>Submit</button>

    </Form>
Glad to have you, {localStorage.getItem('username')}
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
// console.log('values are',values)
    axios
      // https://reqres.in/api/users
      .post("https://art-portfolio-bw.herokuapp.com/auth/register", {username: 'Joe Blox',password: 'zxcvbnmnb'})
      // .post("https://yourdatabaseurlgoeshere.com", values)
      .then(res => {
        // setStatus(res.data);
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('username',res.data.added.username)
        console.log('axios post',res.data); // Data was created successfully and logs to console
        console.log('axios post token',res.data.token); // Data was created successfully and logs to console
        console.log('axios post added',res.data.added); // Data was created successfully and logs to console
        console.log('axios post added username',res.data.added.username); // Data was created successfully and logs to console
        console.log('axios post values',values); // Data was created successfully and logs to console
 // //////////////////////
 axios
 // https://reqres.in/api/users
 .get("https://art-portfolio-bw.herokuapp.com/")
 // .post("https://yourdatabaseurlgoeshere.com", values)
 .then(res => {
console.log('get res.data',res.data)
  setStatus(res.data);
//   console.log('from get',res.data); // Data was created successfully and logs to console

// http://localhost:5000/api/restricted/data

   // console.log('status',status); // Data was created successfully and logs to console
     // resetForm();
     setSubmitting(false);
   })
   .catch(err => {
     console.log('get',err); // There was an error creating the data and logs to console
     setSubmitting(false);
   });
 // /////////////////////
 // http://localhost:5000/api/restricted/data

        // console.log('status',status); // Data was created successfully and logs to console
          // resetForm();
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
