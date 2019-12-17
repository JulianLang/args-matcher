import { isDefined } from './is-defined';

export function toArray(obj: any): any[] {
  if (!isDefined(obj)) {
    throw new Error('Refuse to convert "${obj}" into an array.');
  }

  return Object.keys(obj).map(k => obj[k]);
}
