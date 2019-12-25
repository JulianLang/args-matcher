import {
  AnyFn,
  AnyObject,
  ArgumentSymbol,
  MatchRule,
  MatchRules,
  ParentMatchRule,
  SubMatchRule,
} from './types';
import {
  isArgMatcher,
  isDefined,
  isPrimitive,
  isSetterFn,
  isSubMatchRule,
  setSymbol,
  toArgsDictionary,
} from './util';

export const globalRuleIdentifier = '*';

export function match<T extends AnyFn>(fn: Function, rules: MatchRules, ...args: Parameters<T>) {
  let originalArgs = toArgsDictionary(fn, args);
  let currentArgs = { ...originalArgs };

  iterateArgs(originalArgs, rules);

  return cleanUpArgs(currentArgs);

  function iterateArgs(args: AnyObject, rules: MatchRules) {
    for (const argName of Object.keys(args)) {
      const argValue = args[argName];
      const matchingRules = tryMatchArg(argName, argValue, rules);

      if (matchingRules.length > 0) {
        applyRule(argName, matchingRules);
      }
    }
  }

  function tryMatchArg(argName: string, argValue: any, rules: MatchRules): MatchRule[] {
    const matches: MatchRule[] = [];
    const argRules = getArgRules(rules, argName);

    for (const rule of argRules) {
      if (!Array.isArray(rule.when)) {
        rule.when = [rule.when];
      }

      if (tryMatchRule(rule, argValue)) {
        const matchingSubRule = tryMatchSubRulesOf(rule, originalArgs);
        const exactRuleMatch = isDefined(matchingSubRule) ? matchingSubRule : rule;

        matches.push(exactRuleMatch);
      }
    }

    return matches;
  }

  function tryMatchRule(rule: ParentMatchRule, argValue: any): boolean {
    for (let i = 0; i < rule.when.length; i++) {
      const matchExpr = rule.when[i];

      // early cancel rule match
      if (tryMatch(argValue, matchExpr)) {
        return true;
      }
    }

    return false;
  }

  function tryMatchSubRulesOf(parentRule: ParentMatchRule, args: AnyObject): MatchRule | null {
    if (!isSubMatchRule(parentRule)) {
      // parent rule has no "and" conditions, so it fully matches by now.
      return parentRule;
    }
    if (parentRule.and.length === 0) {
      console.warn('Empty "and" block encountered. The whole rule will don`t do anything.');
      return null;
    }

    for (const subrule of parentRule.and) {
      if (tryMatchSubRule(subrule, args)) {
        return subrule;
      }
    }

    return null;
  }

  function tryMatchSubRule(rule: SubMatchRule, args: AnyObject): boolean {
    for (const argName of Object.keys(rule.args)) {
      const argMatcher = rule.args[argName];
      const argValue = args[argName];

      if (!tryMatch(argValue, argMatcher)) {
        return false;
      }
    }

    return true;
  }

  function tryMatch(argValue: any, matchExpr: any): boolean {
    if (!isPrimitive(argValue)) {
      // to prevent confusability between fns as argument, and fns of user.
      setSymbol(ArgumentSymbol, argValue);
    }

    const isMatcherFn = isArgMatcher(matchExpr);
    const applies = isMatcherFn ? matchExpr(argValue) : argValue === matchExpr;

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

  function getArgRules(rules: MatchRules, argName: string): ParentMatchRule[] {
    const globalRules: ParentMatchRule[] = rules[globalRuleIdentifier]
      ? rules[globalRuleIdentifier]
      : [];
    const argRules: ParentMatchRule[] = rules[argName] ? rules[argName] : [];

    return argRules.concat(globalRules);
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
    let value = currentArgs[property];

    while (isSetterFn(value)) {
      value = value(currentArgs, property, currentArgs[property]);
    }

    currentArgs[property] = value;
  }
}
