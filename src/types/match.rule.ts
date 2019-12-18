import { AnyFn } from './any-fn';
import { ArgMatcher } from './arg-matcher';
import { Func } from './func';

export type MatchRule<T extends AnyFn = any, K extends {} = any> =
  | SetArgsMatchRule<T, K>
  | CallArgsMatchRule<T>;

export interface ArgsMatchRule {
  name?: string;
  exactMatch?: boolean;
  match: (ArgMatcher | any)[];
}

// TODO: langju: for some strange reasons, the unused T must remain, as it results in compiler not being able to pattern match
export interface SetArgsMatchRule<T extends AnyFn = any, K extends {} = any> extends ArgsMatchRule {
  set: Func<[K], Partial<K>>;
  before?: Func<[K], void>;
  after?: Func<[K], void>;
}

export interface CallArgsMatchRule<T extends AnyFn = AnyFn> extends ArgsMatchRule {
  call: Func<Parameters<T>, void>;
}
