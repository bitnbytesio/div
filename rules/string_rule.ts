import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function string(): ValidationRuleContract {
  return {
    name: "alpha",
    handler: (value: any) => {
      return typeof value === "string";
    },
  };
}
