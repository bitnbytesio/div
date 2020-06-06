import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function hash(args: Array<any>): ValidationRuleContract {
  return {
    name: "hash",
    handler: (value: any) => {
      return validator.isHash(String(value), args);
    },
  };
}
