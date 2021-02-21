import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from './variables';
import { dbConfig } from './models/db.config';
import { TaskEntity } from '../../src/tasks/entities/task.entity';
import { BoardEntity } from '../../src/board/entities/board.entity';
import { UserEntity } from '../../src/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = dbConfig.dev;
          break;
        case TEST:
          config = dbConfig.test;
          break;
        case PRODUCTION:
          config = dbConfig.prod;
          break;
        default:
          config = dbConfig.dev;
      }
      const sequelize = new Sequelize(config);
      const linkUserBoarder = sequelize.define('linkUserToBoarderEntities', {});
      sequelize.addModels([TaskEntity, UserEntity, BoardEntity]);

      BoardEntity.belongsToMany(UserEntity, { through: linkUserBoarder });
      UserEntity.belongsToMany(BoardEntity, { through: linkUserBoarder });

      await sequelize.sync();
      return sequelize;
    },
  },
];
