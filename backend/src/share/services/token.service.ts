import * as jwt_decode from 'jwt-decode';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor() {}

  public getDecodedAccessToken(
    token: string,
  ): {
    id: number;
    name: string;
  } {
    try {
      // @ts-ignore
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }
}
