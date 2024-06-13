import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './services/pokemon.service';
import { PokemonController } from './controllers/pokemon.controller';

@Module({
  imports: [
    HttpModule,
    // CacheModule.register({
    //   store: redisStore as any,
    //   host: 'redis-19936.c329-east4-1.gce.redns.redis-cloud.com',
    //   port: 19936,
    //   auth_pass: 'KUIjGJn0W2Whtf4bs7fbMPo0fGls8kNt',
    //   db: 0,
    //   ttl: 600
    // }),
  ],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}