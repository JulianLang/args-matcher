import { AnyFn } from './any-fn';
import { Func } from './func';

export type MatchRule<T extends AnyFn, K extends {}> =
  | SetArgsMatchRule<T, K>
  | DelegateArgsMatchRule<T, K>;

export interface ArgsMatchRule<T extends AnyFn> {
  match: Parameters<T>;
}

export interface SetArgsMatchRule<T extends AnyFn, K extends {}> extends ArgsMatchRule<T> {
  // TODO: fix typings :(
  set: Func<[K], Partial<K>>;
  before?: Func<[K], void>;
  after?: Func<[K], void>;
}

export interface DelegateArgsMatchRule<T extends AnyFn, K extends {}> extends ArgsMatchRule<T> {
  // TODO: fix typings :(
  call: Func<[K], void>;
}
