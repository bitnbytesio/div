import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function creditCard(): ValidationRuleContract {
  return {
    name: "creditCard",
    handler: (value: any) => {
      if (validator.isCreditCard(String(value))) {
        return true;
      }

      return false;
    },
  };
}
