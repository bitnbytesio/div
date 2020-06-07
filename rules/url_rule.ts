import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function url(): ValidationRuleContract {
  return {
    name: "url",
    handler: (value: any) => {
      return validator.isURL(value);
    },
  };
}
