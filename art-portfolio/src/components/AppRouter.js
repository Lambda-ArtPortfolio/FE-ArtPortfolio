//* Alexis Panyathong's Section *//

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Login from './Login';


//Styled Components
import { Nav } from './StyledWidgets';

const AppRouter = () => {

    return (
        <Router>
            <div className="app-router">
                <Nav>
                    <Link to='/login'>Login</Link>
                </Nav>
            </div>

            <Switch>
                <Route path='/login' component={Login} />
            </Switch>
        </Router>
    )

    
}

export default AppRouter;