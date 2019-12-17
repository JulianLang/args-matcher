export function sanitizeParamName(name: string): string {
  name = name.replace('...', '');

  return name;
}
