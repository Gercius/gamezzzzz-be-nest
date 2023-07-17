import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Game } from './schemas/game.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name)
    private gamesModel: mongoose.Model<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    const games = await this.gamesModel.find();
    return games;
  }

  async findById(id: string): Promise<Game> {
    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundException('Game not found');
    }

    const game = await this.gamesModel.findById(id);

    return game;
  }
}
