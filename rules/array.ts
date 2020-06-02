import { ValidationRuleContract } from "../contracts/validation_rule.ts";

export function array(value: any): ValidationRuleContract {
  return {
    name: "array",
    handler: (value: any) => {
      return Array.isArray(value);
    },
  };
}
