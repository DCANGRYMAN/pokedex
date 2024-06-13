import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { throwError, forkJoin, of } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  search(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    return this.httpService.get(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
      .pipe(
        mergeMap(response => {
          const pokemonUrls = response.data.results
            .filter((pokemon: { name: string | string[]; }) => pokemon.name.includes(lowerCaseQuery))
            .map((pokemon: { url: any; }) => pokemon.url);
          if (pokemonUrls.length === 0) {
            return of([]);
          }
          return forkJoin(pokemonUrls.map((url: string) => this.httpService.get(url).pipe(map(response => response.data))));
        }),
        catchError(error => throwError(error))
      );
  }
}