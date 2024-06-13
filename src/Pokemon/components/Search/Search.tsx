import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from 'lodash';
import './Search.scss';

interface Sprites {
  front_default: string;
}

interface Pokemon {
  name: string;
  url: string;
  sprites?: Sprites;
  base_experience?: number;
}

const SearchPokemon = () => {
  const [input, setInput] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setSelectedPokemon(null);
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setLoading(true);
      setError(false);
  
      const lowerCaseQuery = query.toLowerCase();
      const cachedResult = localStorage.getItem(lowerCaseQuery);
      if (cachedResult) {
        setSelectedPokemon(JSON.parse(cachedResult));
        setLoading(false);
      } else {
        axios
          .get(`http://localhost:4000/pokemon/search?q=${lowerCaseQuery}`)
          .then((response) => {
            if (response.data.length === 0) {
              setError(true);
            } else {
              setSelectedPokemon(response.data[0]);
              localStorage.setItem(lowerCaseQuery, JSON.stringify(response.data[0]));
            }
            setLoading(false);
          })
          .catch((error) => {
            setError(true);
            setLoading(false);
            setSelectedPokemon(null);
          });
      }
    }, 800),
    []
  );

  useEffect(() => {
    if (input.length > 3) {
      debouncedSearch(input);
    }
  }, [input, debouncedSearch]);

  return (
    <div className="pokemon-search">
      <input type="text" value={input} onChange={handleChange} placeholder="Digite aqui para buscar" />
      {loading && <p>Carregando...</p>}
      {error && <p>Nenhum resultado encontrado!</p>}
      {selectedPokemon && selectedPokemon.sprites && (
        <div className="pokemon-card">
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>{selectedPokemon.name}</p>
          <p>XP: {selectedPokemon.base_experience}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPokemon;