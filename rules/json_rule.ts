import { validator } from "../deps.ts";
import {
  ValidationRuleContract,
} from "../contracts/validation_rule_contracts.ts";

export function json(): ValidationRuleContract {
  return {
    name: "json",
    handler: (value: any) => {
      if (!validator.isJSON(String(value))) {
        return false;
      }

      return true;
    },
  };
}
