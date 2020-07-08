import { contains } from "./contains_rule.ts";
import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function notContains(args: Array<any>): ValidationRuleContract {
  return {
    name: "notContains",
    handler: (value: any, v: ValidatorContract) => {
      return !contains(args).handler(value, v);
    },
  };
}
