import { validator } from "../deps.ts";
import {
  ValidationRuleContract,
} from "../contracts/validation_rule_contracts.ts";

export function integer(): ValidationRuleContract {
  return {
    name: "integer",
    handler: (value: any) => {
      return validator.isInt(String(value));
    },
  };
}
