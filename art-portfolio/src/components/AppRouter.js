import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Login from './Login';

const AppRouter = () => {

    return (
        <Router>
            <div className="app-router">
                <ul>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            </div>

            <Switch>
                <Route path='/login' component={Login} />
            </Switch>
        </Router>
    )

    
}

export default AppRouter;