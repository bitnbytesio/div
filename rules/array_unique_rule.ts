import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function arrayUnique(value: any): ValidationRuleContract {
  return {
    name: "arrayUnique",
    handler: (value: any) => {
      if (!Array.isArray(value)) {
        return false;
      }

      return (new Set(value)).size === value.length;
    },
  };
}
