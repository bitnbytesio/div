import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function numeric(value: any): ValidationRuleContract {
  return {
    name: "numeric",
    handler: (value: any) => {
      return validator.isNumeric(String(value));
    },
  };
}
