import { validator } from "../deps.ts";
import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function _in(args: Array<any>): ValidationRuleContract {
  return {
    name: "in",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;
      if (v.getAttributeValue(anotherAttr).indexOf(String(value)) < 0) {
        return false;
      }

      return true;
    },
  };
}
