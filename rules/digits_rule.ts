import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function digits(args: Array<string> = []): ValidationRuleContract {
  return {
    name: "digits",
    handler: (value: any) => {
      const [len] = args;

      const v = value + "";

      if (validator.isInt(v, {}) && v.length === parseInt(len, 10)) {
        return true;
      }

      return false;
    },
  };
}
