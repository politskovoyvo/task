import { IDBConfig } from './db-config.interface';

export interface IDbMode {
  dev: IDBConfig;
  prod: IDBConfig;
  test: IDBConfig;
}
