import { AnyFn, AnyObject, ArgumentSymbol, MatchRule, MatchRules, SetterFnSymbol } from './types';
import {
  hasSymbol,
  isArgMatcher,
  isPrimitive,
  isSetterFn,
  setSymbol,
  toArgsDictionary,
} from './util';

export const globalRuleIdentifier = '*';

export function match<T extends AnyFn>(fn: Function, rules: MatchRules, ...args: Parameters<T>) {
  let originalArgs = toArgsDictionary(fn, args);
  let currentArgs = { ...originalArgs };

  for (const argName of Object.keys(currentArgs)) {
    const argValue = currentArgs[argName];
    const matchingRules = tryMatchArg(argName, argValue, rules);

    if (matchingRules.length > 0) {
      applyRule(argName, matchingRules);
    }
  }

  return cleanUpArgs(currentArgs);

  function getArgRules(rules: MatchRules, argName: string): MatchRule[] {
    const globalRules: MatchRule[] = rules[globalRuleIdentifier] ? rules[globalRuleIdentifier] : [];
    const argRules: MatchRule[] = rules[argName] ? rules[argName] : [];

    return argRules.concat(globalRules);
  }

  function tryMatchArg(argName: string, argValue: any, rules: MatchRules): MatchRule[] {
    const matches: MatchRule[] = [];
    const argRules = getArgRules(rules, argName);

    for (const rule of argRules) {
      if (!Array.isArray(rule.when)) {
        rule.when = [rule.when];
      }

      if (tryMatchRule(rule, argValue)) {
        matches.push(rule);
      }
    }

    return matches;
  }

  function tryMatchRule(rule: MatchRule, argValue: any): boolean {
    for (let i = 0; i < rule.when.length; i++) {
      const matchExpr = rule.when[i];

      // early cancel rule match
      if (tryMatch(argValue, matchExpr)) {
        return true;
      }
    }

    return false;
  }

  function tryMatch(arg: any, matchExpr: any): boolean {
    if (!isPrimitive(arg)) {
      // to prevent confusability between fns as argument, and fns of user.
      setSymbol(ArgumentSymbol, arg);
    }

    const isMatcherFn = isArgMatcher(matchExpr);
    const applies = isMatcherFn ? matchExpr(arg) : arg === matchExpr;

    return applies;
  }

  function applyRule(argName: string, rules: MatchRule[]) {
    for (const rule of rules) {
      if (isSetterFn(rule.set)) {
        const argValue = originalArgs[argName];
        currentArgs[argName] = rule.set({ ...currentArgs }, argName, argValue);
      } else {
        // e.g.: rule.set: 42
        currentArgs[argName] = rule.set;
      }

      execSetterFns(currentArgs);
    }
  }

  function cleanUpArgs(argsObj: AnyObject): AnyObject {
    for (const property of Object.keys(argsObj)) {
      if (isSetterFn(argsObj[property])) {
        argsObj[property] = undefined;
      }
    }

    return argsObj;
  }
}

function execSetterFns(currentArgs: AnyObject) {
  for (const property of Object.keys(currentArgs)) {
    const value = currentArgs[property];

    if (hasSymbol(SetterFnSymbol, value)) {
      currentArgs[property] = value(currentArgs, property, currentArgs[property]);
    }
  }
}
