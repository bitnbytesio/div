import { validator } from "../deps.ts";
import {
  ValidationRuleContract,
} from "../contracts/validation_rule_contracts.ts";

export function iso8601(): ValidationRuleContract {
  return {
    name: "iso8601",
    handler: (value: any) => {
      return validator.isISO8601(String(value));
    },
  };
}
