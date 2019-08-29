//* Alexis Panyathong's Section *//

import React, { useState, useReducer } from 'react';
import { reducer, initialState } from '../reducers/LoginReducer';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Form, Context, Header, LoginBtn } from './StyledWidgets';




const Login = (props) => {
    const [user, setUser] = useState({username: '', password: ''});
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChanges = e => {
        setUser({...user, [e.target.name]: e.target.value});
        
    };

    const login = e => {
        e.preventDefault();

        axiosWithAuth().post('https://art-portfolio-bw.herokuapp.com/auth/login', user)
            //handle success
            .then(res => {
                console.log(res);

                localStorage.setItem('token', res.data.payload);

                dispatch({ type: 'LOGIN', payload: res.data});
                props.history.push('/profile');
            })
            //handle error
            .catch(err => console.log('Error, please try again', err.response));

            setUser({username: '', password: ''});
    };
    

    console.log(state);

   

    return (
        <>
            <Form>
                <Context>
                    <Header>
                    <h2>Welcome Back</h2>
                    </Header>

                    <div className="form-group">
                        <label>Username: </label>
                        <input 
                            className="form-group"
                            type="username"
                            name="username"
                            placeholder="username"
                            value={user.username} required
                            onChange={handleChanges}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input 
                            className="form-group"
                            type="password"
                            name="password"
                            placeholder="password"
                            value={user.password} required
                            onChange={handleChanges}
                        />
                    </div>

                    <LoginBtn onClick={login} type="submit">Submit</LoginBtn>
                </Context> 
            </Form>
            
        </>
    )
}



export default Login;