import { isPrimitive } from 'util';
import { AnyFn, ArgumentSymbol, MatchRule, SetterFnSymbol } from './types';
import {
  hasSymbol,
  isArgMatcher,
  isDefined,
  isSetArgMatchRule,
  setSymbol,
  toArgsDictionary,
  toArray,
} from './util';

export function match<T extends AnyFn, K extends {} = any>(
  fn: Function,
  rules: MatchRule<T, K>[],
  ...args: Parameters<T>
) {
  let currentArgs = toArgsDictionary(fn, args);
  let currentArgsArray = args;

  for (const rule of rules) {
    if (tryMatchRule(rule, fn, currentArgsArray)) {
      applyRule(rule, fn, args);
    }
  }

  return currentArgs;

  function tryMatchRule(rule: MatchRule<T, any>, fn: Function, args: Parameters<T>): boolean {
    for (let i = 0; i < rule.match.length; i++) {
      const matchExpr = rule.match[i];
      const arg = args[i];

      // early cancel rule match
      if (!tryMatch(matchExpr, arg)) {
        return false;
      }
    }

    return true;
  }

  function tryMatch(matchExpr: any, arg: any): boolean {
    if (!isPrimitive(arg)) {
      // to prevent confusability between fns as argument, and fns of user.
      setSymbol(ArgumentSymbol, arg);
    }

    const isMatcherFn = isArgMatcher(matchExpr);
    const applies = isMatcherFn ? matchExpr(arg) : arg === matchExpr;

    return applies;
  }

  function applyRule(rule: MatchRule<T, any>, fn: Function, args: Parameters<T>) {
    if (isSetArgMatchRule(rule)) {
      if (isDefined(rule.before)) {
        rule.before(currentArgs);
      }

      const argsObj = toArgsDictionary(fn, args);
      const updatedArgsObj = rule.set(argsObj);
      execSetterFns(updatedArgsObj);
      updateArgs(updatedArgsObj);

      if (isDefined(rule.after)) {
        rule.after(currentArgs);
      }
    } else {
      rule.call(...args);
    }
  }

  function execSetterFns(argsObj: any) {
    for (const key of Object.keys(argsObj)) {
      const value = argsObj[key];

      if (hasSymbol(SetterFnSymbol, value)) {
        argsObj[key] = value(key, currentArgs[key], argsObj);
      }
    }
  }

  function updateArgs(updatedArgsObj: any) {
    currentArgs = {
      ...currentArgs,
      ...updatedArgsObj,
    };
    currentArgsArray = toArray(currentArgs) as Parameters<T>;
  }
}
