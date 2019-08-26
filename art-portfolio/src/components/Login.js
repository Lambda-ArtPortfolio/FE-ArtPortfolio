//* Alexis Panyathong's Section *//

import React, { useState, useEffect } from 'react';

import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from './utils/axiosWithAuth';




const Login = ({errors, touched, status}) => {
    const [users, setUsers] = useState([]);

    console.log(users);

    useEffect(() => {
        if(status) {
            setUsers([...users, status]);
        }

    }, [status]);

    return (
        <div className="user-form">
            <Form>
                <label>Username:</label>
                <Field type="text" name="username" placeholder="username" />
                    {touched.username && errors.username && (
                        <p className="error">{errors.username}</p>
                    )}

                <label>Password:</label>
                <Field type="password" name="password" placeholder="password" />
                        {touched.username && errors.password && (
                            <p className="error">{errors.password}</p>
                        )}

                <button type="submit">Submit</button>
                
            </Form>
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('* Required to have a username.'),
        password: Yup.string().required('* Required to have a password.')
    }),

    handleSubmit(values, {setStatus}) {
        axiosWithAuth().post('https://art-portfolio-bw.herokuapp.com/auth/login', values)
            //handle success
            .then(res => {
                setStatus(res.data);
            })
            //handle error
            .catch(err => console.log('Error, please try again', err.response));
    }
})(Login);

export default FormikUserForm;