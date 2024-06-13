import React, { FC } from 'react';
import './App.css';
import SearchPokemon from './components/SearchPokemon';

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Buscar Pokémon</h3>
        <SearchPokemon />
      </header>
    </div>
  );
}

export default App;