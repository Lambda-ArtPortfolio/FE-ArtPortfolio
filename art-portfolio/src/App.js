import React, { useState, useContext} from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import {ArtistContext} from './contexts/ArtistContext.js'

// Components
// import Navigation from './components/Navigation';
// import CreatePost from './components/CreatePost';
// import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
	const [artist, setArtist] = useState();

	return (
		<div className="App">
	<ArtistContext.Provider value={{ artist, setArtist }}>
			<Navigation artist={artist} />

			{/* Routes */}
      <main>
    <Router>
      <div>
        <ul>
        <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/sign">Sign Up</Link>
          </li>
          <li>
            <Link to="/protected">Add Art</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Login} />
        <Route path="/sign" component={SignUp} />
        <PrivateRoute path="/protected" component={CreatePost} />

      </div>

    </Router>
    </main>
	</ArtistContext.Provider>
	</div>
	);
}

export default App;

function Navigation (){return <div>Navigation function </div>}
function Login (){return <div>Login function </div>}
function CreatePost (){
  let artist = useContext(ArtistContext).artist
artist = artist ? artist : 'N/A'
  console.log('artist',artist)
  return <div>Create Post function artist is {artist}</div>
}
