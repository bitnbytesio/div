import { validator } from "../deps.ts";
import {
  ValidationRuleContract,
} from "../contracts/validation_rule_contracts.ts";

export function ip(): ValidationRuleContract {
  return {
    name: "ip",
    handler: (value: any) => {
      if (!validator.isIP(String(value))) {
        return false;
      }

      return true;
    },
  };
}
