import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function hexColor(): ValidationRuleContract {
  return {
    name: "hexColor",
    handler: (value: any) => {
      return validator.isHexColor(String(value));
    },
  };
}
