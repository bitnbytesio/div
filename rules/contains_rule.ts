import { validator } from "../deps.ts";
import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function contains(args: Array<any>): ValidationRuleContract {
  return {
    name: "contains",
    handler: (value: any, v: ValidatorContract) => {
      const [find] = args;
      if (!validator.contains(String(value), v.getAttributeValue(find))) {
        return false;
      }

      return true;
    },
  };
}
