import { sanitizeParamName } from './sanitize-param-name';
const fnArgs: any = require('function-arguments');

const restOperator = '...';

export function toArgsDictionary(fn: Function, args: any[]): any {
  const params: any[] = resolveArguments(fn);
  const result: any = {};

  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const sanitizedParam = sanitizeParamName(param);

    if (param.startsWith(restOperator) && args[i] === undefined) {
      result[sanitizedParam] = [];
    } else {
      result[sanitizedParam] = args[i];
    }
  }

  return result;
}

function resolveArguments(fn: Function) {
  const args: any[] = [...fnArgs(fn), ...tryDetectUndefinedRestParameter(fn)];

  return args;
}

// TODO: langju: there must be better ways?
function tryDetectUndefinedRestParameter(fn: Function): any[] {
  const fnSignature = fn.toString();
  const regex = /\.{3}([\w\d]+)/;
  const match = regex.exec(fnSignature);

  if (match && match.length > 1) {
    const restParam = match[0];

    return [restParam];
  }

  return [];
}
