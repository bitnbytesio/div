import { validator } from "../deps.ts";
import { ValidationRuleContract, ValidatorContract } from "../contracts/validation_rule_contracts.ts";

export function max(args: Array<any>): ValidationRuleContract {
  return {
    name: "max",
    handler: (value: any, v: ValidatorContract) => {
      const [maxNum] = args;

      if (!Number(String(value)) || Number(value) > Number(v.getAttributeValue(maxNum))) {
        return false;
      }

      return true;
    },
  };
}
