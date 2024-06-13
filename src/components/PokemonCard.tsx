import React from 'react';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => (
  <div className="pokemon-card">
    <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
    <p>{pokemon.name}</p>
    <p>XP: {pokemon.base_experience}</p>
  </div>
);

export default PokemonCard;