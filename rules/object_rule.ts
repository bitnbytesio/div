import { validator } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function object(): ValidationRuleContract {
  return {
    name: "object",
    handler: (value: any) => {
      return (!!value) && (value.constructor === Object);
    },
  };
}
