import React from 'react';
import { PokemonCardProps } from '../interfaces/PokemonInterfaces';

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => (
  <div className="pokemon-card">
    <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
    <p>{pokemon.name}</p>
    <p>Height: {pokemon.height}</p>
    <p>Weight: {pokemon.weight}</p>
    <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    <p>XP: {pokemon.base_experience}</p>
  </div>
);

export default PokemonCard;