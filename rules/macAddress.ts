import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function macAddress(): ValidationRuleContract {
  return {
    name: "macAddress",
    handler: (value: any) => {
      return validator.isMACAddress(String(value));
    },
  };
}
