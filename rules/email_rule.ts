import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function email(): ValidationRuleContract {
  return {
    name: "email",
    handler: (value: any) => {
      if (!validator.isEmail(String(value))) {
        return false;
      }

      return true;
    },
  };
}
