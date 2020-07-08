import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function regex(args: Array<any>): ValidationRuleContract {
  return {
    name: "regex",
    handler: (value: any, v: ValidatorContract) => {
      const [pattren] = args;
      const regexp = new RegExp(v.getAttributeValue(pattren));

      if (!regexp.test(value)) {
        return false;
      }

      return true;
    },
  };
}
