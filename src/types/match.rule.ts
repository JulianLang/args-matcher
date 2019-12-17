import { AnyFn } from './any-fn';
import { ArgMatcher } from './arg-matcher';
import { Func } from './func';

export type MatchRule<T extends AnyFn = any, K extends {} = any> =
  | SetArgsMatchRule<T, K>
  | DelegateArgsMatchRule<T, K>;

export interface ArgsMatchRule {
  name?: string;
  match: (ArgMatcher | any)[];
}

export interface SetArgsMatchRule<T extends AnyFn, K extends {}> extends ArgsMatchRule {
  // TODO: fix typings :(
  set: Func<[K], Partial<K>>;
  before?: Func<[K], void>;
  after?: Func<[K], void>;
}

export interface DelegateArgsMatchRule<T extends AnyFn, K extends {}> extends ArgsMatchRule {
  // TODO: fix typings :(
  call: Func<Parameters<T>, void>;
}
