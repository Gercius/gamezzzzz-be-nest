import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  async getAllGames(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 30,
    ): Promise<Game[]> {
    return this.gamesService.findAll(page, pageSize);
  }

  @Get(':id')
  async getGame(
    @Param('id')
    id: string,
  ): Promise<Game> {
    return this.gamesService.findById(id);
  }
}
