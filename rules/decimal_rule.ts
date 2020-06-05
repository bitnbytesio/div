import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function decimal(): ValidationRuleContract {
  return {
    name: "decimal",
    handler: (value: any) => {
      return validator.isDecimal(String(value));
    },
  };
}
