import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function min(args: Array<any>): ValidationRuleContract {
  return {
    name: "min",
    handler: (value: any, v: ValidatorContract) => {
      const [maxNum] = args;

      if (
        !Number(String(value)) ||
        Number(value) < Number(v.getAttributeValue(maxNum))
      ) {
        return false;
      }

      return true;
    },
  };
}
