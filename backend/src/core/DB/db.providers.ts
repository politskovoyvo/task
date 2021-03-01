import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from './variables';
import { dbConfig } from './models/db.config';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { BoardEntity } from '../../board/entities/board.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { LinkUserCompanyEntity } from '../../links/link-user-company.entity';
import { LinkUserBoardEntity } from '../../links/link-user-board.entity';

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
      sequelize.addModels([
        TaskEntity,
        UserEntity,
        BoardEntity,
        CompanyEntity,

        // LINKS
        LinkUserCompanyEntity,
        LinkUserBoardEntity,
      ]);

      // force: true - пересоздает таблицы если они не соответствуют модели
      // await sequelize.sync({ force: true });
      await sequelize.sync();
      return sequelize;
    },
  },
];
