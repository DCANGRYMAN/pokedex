
interface Ability {
    ability: {
      name: string;
    };
  }
  
  interface Pokemon {
    name: string;
    sprites: {
      front_default: string;
    };
    height: number;
    weight: number;
    abilities: Ability[];
    base_experience: number;
  }