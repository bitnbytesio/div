import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function domain(): ValidationRuleContract {
  return {
    name: "domain",
    handler: (value: any) => {
      return validator.isFQDN(String(value));
    },
  };
}
