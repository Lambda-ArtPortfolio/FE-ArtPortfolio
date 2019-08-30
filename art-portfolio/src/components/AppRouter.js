//* Alexis Panyathong's Section *//

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Login from './Login';
import ProfilePage from './ProfilePage';
import SignUp from './SignUp';


//Styled Components
import { Nav } from './StyledWidgets';

//* Alexis added PrivateRoute and imported it */
import PrivateRoute from './PrivateRoute';

//* I changed the order of the routes and made signup the main page - Alexis */

const AppRouter = () => {
  
    return (
        <Router>
            <div className="app-router">
                <Nav>
                    <div className="nav-a">
                    <Link to='/'>Sign Up</Link>
                    <Link to='/signout'>Sign Out</Link>
                        <Link to ='/login'>Login</Link>
                        <Link to = '/profile'>Profile</Link>
                    </div>
                </Nav>
            </div>

            <Switch>
                <Route exact path= '/' component={SignUp} />
                <Route path='/signout' component={SignOut} />
                <Route path='/login' component={Login} />
                <PrivateRoute path='/profile' component={ProfilePage} />
                
            </Switch>
        </Router>
    )

    
}

export default AppRouter;

function SignOut() {
    localStorage.setItem('token',false)
    let randnum = Math.random()
return (
    <Nav>
        <a href='https://amazing-saha-bf876d.netlify.com/'>Dakotah</a>
        <a href='https://amazing-leakey-c7655e.netlify.com/'>Apetsi</a>
        <a href='https://laughing-carson-0d82a5.netlify.com/'>Adam</a>
    </Nav>
)
}
