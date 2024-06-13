import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return this.pokemonService.search(query);
  }
}