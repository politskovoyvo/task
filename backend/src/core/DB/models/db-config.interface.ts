export interface IDBConfig {
  username: string;
  password: string;
  database: string;
  port?: number | string;
  host: string;

  // ???
  dialect?: string;
  urlDatabase?: string;
}
