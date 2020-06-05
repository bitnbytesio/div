import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function numeric(): ValidationRuleContract {
  return {
    name: "numeric",
    handler: (value: any) => {
      return validator.isNumeric(String(value));
    },
  };
}
