import { validator } from "../deps.ts";
import {
  ValidationRuleContract,
} from "../contracts/validation_rule_contracts.ts";

export function phoneNumber(): ValidationRuleContract {
  return {
    name: "phoneNumber",
    handler: (value: any) => {
      return validator.isMobilePhone(String(value));
    },
  };
}
