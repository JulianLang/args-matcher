import { sanitizeParamName } from './sanitize-param-name';
const fnArgs: any = require('function-arguments');

export function toObject(fn: Function, args: any[]): any {
  const params = fnArgs(fn);
  const result: any = {};

  for (let i = 0; i < params.length; i++) {
    const param = sanitizeParamName(params[i]);
    result[param] = args[i];
  }

  return result;
}
