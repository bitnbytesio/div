import { _in } from "./in_rule.ts";
import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function notIn(args: Array<any>): ValidationRuleContract {
  return {
    name: "notIn",
    handler: (value: any, v: ValidatorContract) => {
      return !_in(args).handler(value, v);
    },
  };
}
