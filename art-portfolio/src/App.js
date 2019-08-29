
import './App.css';
import React, { useState } from 'react';
import {ArtistContext} from './contexts/ArtistContext.js'
import AppRouter from './components/AppRouter';

//* I just cleaned up the code, no major changes - Alexis */

function App() {
  

	const [artist, setArtist] = useState();

	return (
		<div className="App">
      <ArtistContext.Provider value={{ artist, setArtist }}>
        <main>
          <AppRouter />
        </main>
      
      </ArtistContext.Provider>
	  </div>
	);
}

export default App;


