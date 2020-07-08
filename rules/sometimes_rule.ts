import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function sometimes(args: Array<any>): ValidationRuleContract {
  return {
    name: "sometimes",
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
