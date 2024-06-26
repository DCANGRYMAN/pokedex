import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import { debounce } from 'lodash';
import SearchInput from './SearchInput';
import { searchPokemon } from "../services/PokemonService";
import PokemonCard from "./PokemonCard";
import { Pokemon } from "../interfaces/PokemonInterfaces";

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
    debounce(async (query: string) => {
      setLoading(true);
      setError(false);
  
      const pokemon = await searchPokemon(query);
      if (pokemon) {
        setSelectedPokemon(pokemon);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 800),
    []
  );

  useEffect(() => {
    if (input.length) {
      debouncedSearch(input);
    }
  }, [input, debouncedSearch]);

  return (
    <div className="pokemon-search">
      <SearchInput value={input} onChange={handleChange} />
      {loading && <p>Carregando...</p>}
      {error && <p>Nenhum resultado encontrado!</p>}
      {selectedPokemon && selectedPokemon.sprites && <PokemonCard pokemon={selectedPokemon} />}
    </div>
  );
};

export default SearchPokemon;