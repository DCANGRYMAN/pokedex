import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [HttpModule, PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}