export interface IDBConfig {
  user: string;
  pass: string;
  database: string;
  port?: number | string;
  host: string;

  // ???
  dialect?: string;
  urlDatabase?: string;
}
