import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function array(value: any): ValidationRuleContract {
  return {
    name: "array",
    handler: (value: any) => {
      return Array.isArray(value);
    },
  };
}
