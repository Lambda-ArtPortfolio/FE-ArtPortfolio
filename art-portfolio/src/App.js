import React from 'react';
import './App.css';
import React, { useState, useContext} from 'react';
import {ArtistContext} from './contexts/ArtistContext.js'
import AppRouter from './components/AppRouter';


function App() {
  

	const [artist, setArtist] = useState();

	return (
		<div className="App">
	<ArtistContext.Provider value={{ artist, setArtist }}>
			<Navigation artist={artist} />

      <main>
   
 <AppRouter />
    
    </main>
    
	</ArtistContext.Provider>
	</div>
	);
}

export default App;


