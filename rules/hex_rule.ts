import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function hex(): ValidationRuleContract {
  return {
    name: "hex",
    handler: (value: any) => {
      return validator.isHexadecimal(String(value));
    },
  };
}
