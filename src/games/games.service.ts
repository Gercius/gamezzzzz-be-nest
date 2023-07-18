import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Game } from './schemas/game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name)
    private gamesModel: mongoose.Model<Game>,
  ) {}

  async findAll(page = 1, pageSize = 10): Promise<Game[]> {
    const skip = pageSize * (page - 1)

    const games = await this.gamesModel
      .find()
      .skip(skip)
      .limit(pageSize);
      
    return games;
  }

  // async findAll(query: Query): Promise<Game[]> {
  //   // const itemsPerPage = 90;
  //   const itemsPerPage = 90;
  //   const currentPage = Number(query.page) || 1;
  //   const skip = itemsPerPage * (currentPage - 1);

  //   const games = await this.gamesModel
  //     .find()
  //     .limit(itemsPerPage)
  //     .skip(skip);
      
  //   return games;
  // }

  async findById(id: string): Promise<Game> {
    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundException('Game not found');
    }

    const game = await this.gamesModel.findById(id);

    return game;
  }
}
