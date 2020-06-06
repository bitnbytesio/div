import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function mongoId(): ValidationRuleContract {
  return {
    name: "mongoId",
    handler: (value: any) => {
      return validator.isMongoId(String(value));
    },
  };
}
