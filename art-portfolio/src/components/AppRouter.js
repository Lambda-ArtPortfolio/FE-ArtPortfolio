//* Alexis Panyathong's Section *//

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Login from './Login';
import ProfilePage from './ProfilePage';
import SignUp from './SignUp';


//Styled Components
import { Nav } from './StyledWidgets';

const AppRouter = () => {
  
    return (
        <Router>
            <div className="app-router">
                <ul>
                    <li>
                        <Link to='/login'>Login</Link>
                        <Link to ='/profile'>Profile</Link>
                        <Link to = '/signUp'>Sign-Up</Link>
                    </li>
                </ul>
            </div>

            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/profile' component={ProfilePage} />
                <Route path= '/signUp' component={SignUp} />
            </Switch>
        </Router>
    )

    
}

export default AppRouter;