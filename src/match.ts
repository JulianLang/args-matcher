import { isPrimitive } from 'util';
import { AnyFn, ArgumentValueSymbol, MatchRule, SetArgsMatchRule } from './types';
import { isArgMatcher, isDefined, isSetMatchRule, setSymbol, toArray, toObject } from './util';

export function match<T extends AnyFn, K extends {} = any>(
  fn: Function,
  rules: MatchRule<T, K>[],
  ...args: Parameters<T>
) {
  let currentArgs = toObject(fn, args);
  let currentArgsArray = args;

  for (const rule of rules) {
    tryMatchRule(rule, fn, currentArgsArray);
  }

  return currentArgs;

  function tryMatchRule(rule: MatchRule<T, any>, fn: Function, args: Parameters<T>): void {
    for (let i = 0; i < rule.match.length; i++) {
      const matchExpr = rule.match[i];
      const arg = args[i];

      // early cancel rule match
      if (!tryMatch(matchExpr, arg)) {
        return;
      }
    }

    applyRule(rule, fn, args);
  }

  function tryMatch(matchExpr: any, arg: any): boolean {
    if (!isPrimitive(arg)) {
      // to prevent confusability between fns as argument, and fns of user.
      setSymbol(ArgumentValueSymbol, arg);
    }

    const isMatcherFn = isArgMatcher(matchExpr);
    const applies = isMatcherFn ? matchExpr(arg) : arg === matchExpr;

    return applies;
  }

  function applyRule(rule: MatchRule<T, any>, fn: Function, args: Parameters<T>) {
    if (isSetMatchRule(rule)) {
      if (isDefined(rule.before)) {
        rule.before(currentArgs);
      }

      updateArgs(fn, args, rule);

      if (isDefined(rule.after)) {
        rule.after(currentArgs);
      }
    } else {
      rule.call(...args);
    }
  }

  function updateArgs(fn: Function, args: Parameters<T>, rule: SetArgsMatchRule<T, any>) {
    const argsObj = toObject(fn, args);
    const result = rule.set(argsObj);
    currentArgs = {
      ...currentArgs,
      ...result,
    };
    currentArgsArray = toArray(currentArgs) as Parameters<T>;
  }
}
