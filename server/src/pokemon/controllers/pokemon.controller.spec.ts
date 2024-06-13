import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    pokemonController = app.get<PokemonController>(PokemonController);
    pokemonService = app.get<PokemonService>(PokemonService);
  });

describe('search', () => {
  it('should return the result of the search method of the PokemonService', async () => {
    const result = ['test'];
    jest.spyOn(pokemonService, 'search').mockImplementation(() => of(result));

    expect(await (await pokemonController.search('test')).toPromise()).toEqual(result);
  });
});
});