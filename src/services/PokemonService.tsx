// PokemonService.ts
import axios from 'axios';

export const searchPokemon = async (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  const cachedResult = localStorage.getItem(lowerCaseQuery);
  if (cachedResult) {
    return JSON.parse(cachedResult);
  } else {
    const response = await axios.get(`http://localhost:4000/pokemon/search?q=${lowerCaseQuery}`);
    if (response.data.length > 0) {
      localStorage.setItem(lowerCaseQuery, JSON.stringify(response.data[0]));
      return response.data[0];
    }
    return null;
  }
};