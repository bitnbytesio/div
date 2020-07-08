import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function maxLength(args: Array<any>): ValidationRuleContract {
  return {
    name: "maxLength",
    handler: (value: any, v: ValidatorContract) => {
      const [maxNum] = args;

      if (value.toString().length > parseInt(v.getAttributeValue(maxNum))) {
        return false;
      }

      return true;
    },
  };
}
