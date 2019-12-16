import { Func } from './func';

export interface ArgsMatchRule<T> {
  match: T[];
  set: Func<[T], T>;
  before?: Func<[T], void>;
  after?: Func<[T], void>;
}
