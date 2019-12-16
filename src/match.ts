import { AnyFn, MatchRule } from './types';

export function match<T extends AnyFn, K extends {} = any>(
  rules: MatchRule<T, K>[],
  ...args: Parameters<T>
) {}
