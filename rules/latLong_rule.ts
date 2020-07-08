import { validator } from "../deps.ts";
import {
  ValidationRuleContract,
} from "../contracts/validation_rule_contracts.ts";

export function latLong(): ValidationRuleContract {
  return {
    name: "latLong",
    handler: (value: any) => {
      if (validator.isLatLong(String(value))) {
        return true;
      }

      return false;
    },
  };
}
