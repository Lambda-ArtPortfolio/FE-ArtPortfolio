//* Alexis Panyathong's Section *//

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Login from './Login';
import ProfilePage from './ProfilePage';
import SignUp from './SignUp';
import NavTab from './NavTab';


//Styled Components
import { Nav } from './StyledWidgets';

const AppRouter = () => {
  
    return (
        <Router>
            <NavTab />
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/profile' component={ProfilePage} />
                <Route path= '/signUp' component={SignUp} />
            </Switch>
        </Router>
    )

    
}

export default AppRouter;