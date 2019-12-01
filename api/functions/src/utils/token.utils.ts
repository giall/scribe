import { verify } from 'jsonwebtoken';
import { properties } from '../properties/properties';
import { log } from '../logger/log';
import { Errors } from '../error/errors';

export enum Token {
  Access = 'access'
}

export interface Payload {
  id: string;
  type: Token;
}

function decode(token: string) {
  let payload: Payload;
  try {
    payload = verify(token, properties.jwt.secret as string) as Payload;
  } catch (err) {
    log.warn(`Invalid token: ${err.name}`);
    throw Errors.unauthorized('Invalid token.');
  }
  if (payload.type !== Token.Access) {
    log.warn(`Unexpected token payload type: ${payload.type}`);
    throw Errors.unauthorized('Invalid token.');
  }
  return payload;
}

export { decode };
