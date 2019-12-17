export function toArray(obj: any): any[] {
  return Object.keys(obj).map(k => obj[k]);
}
