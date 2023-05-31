import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  async getAllGames(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  async getGame(
    @Param('id')
    id: string,
  ): Promise<Game> {
    return this.gamesService.findById(id);
  }
}
