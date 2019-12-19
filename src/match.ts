import { isPrimitive } from 'util';
import { AnyFn, ArgumentSymbol, MatchRule, MatchRules, SetterFnSymbol } from './types';
import {
  hasSymbol,
  isArgMatcher,
  isDefined,
  isSetterFn,
  setSymbol,
  toArgsDictionary,
} from './util';

export const globalRuleIdentifier = '*';

export function match<T extends AnyFn>(fn: Function, rules: MatchRules, ...args: Parameters<T>) {
  let currentArgs = toArgsDictionary(fn, args);

  for (const argName of Object.keys(currentArgs)) {
    const argValue = currentArgs[argName];
    const matchingRules = tryMatchArg(argName, argValue, rules);

    if (matchingRules.length > 0) {
      applyRule(argName, matchingRules);
    }
  }

  return currentArgs;

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

  function getArgRules(rules: MatchRules, argName: string): MatchRule[] {
    const globalRules: MatchRule[] = rules[globalRuleIdentifier] ? rules[globalRuleIdentifier] : [];
    const argRules: MatchRule[] = rules[argName] ? rules[argName] : [];

    return argRules.concat(globalRules);
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
        const argValue = currentArgs[argName];
        currentArgs = rule.set(currentArgs, argName, argValue);
      } else {
        // e.g.: rule.set: 42
        currentArgs[argName] = rule.set;
      }

      execSetterFns(currentArgs);
    }
  }

  function execSetterFns(argsObj: any) {
    if (!isDefined(argsObj)) {
      throw new Error(
        `Argument's context object is "${argsObj}". Did you use a custom setter function, which does not return the passed in context object?`,
      );
    }

    for (const key of Object.keys(argsObj)) {
      const value = argsObj[key];

      if (hasSymbol(SetterFnSymbol, value)) {
        argsObj[key] = value(argsObj, key, currentArgs[key]);
      }
    }
  }
}
