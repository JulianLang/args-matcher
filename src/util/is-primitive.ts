import { isDefined } from './is-defined';

export function isPrimitive(value: any): boolean {
  if (!isDefined(value)) {
    return true;
  }

  switch (typeof value) {
    case 'bigint':
    case 'boolean':
    case 'number':
    case 'string':
    case 'symbol':
      return true;
    default:
      return false;
  }
}
