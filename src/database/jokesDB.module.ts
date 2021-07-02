import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Jokes } from './jokesDB.entity';
import { JokesDBService } from './jokesDB.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jokes])],
  providers: [JokesDBService],
  exports: [JokesDBService],
})
export class JokesDBModule {}
