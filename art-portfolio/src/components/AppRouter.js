import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Login from './Login';
import ProfilePage from './ProfilePage';

const AppRouter = () => {
  
    return (
        <Router>
            <div className="app-router">
                <ul>
                    <li>
                        <Link to='/login'>Login</Link>
                        <Link to ='/profile'>Profile</Link>
                    </li>
                </ul>
            </div>

            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/profile' component={ProfilePage} />
            </Switch>
        </Router>
    )

    
}

export default AppRouter;