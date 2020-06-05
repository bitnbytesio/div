import { ValidationRuleContract, ValidatorContract } from "../contracts/validation_rule_contracts.ts";

export function same(
  args: Array<string>,
): ValidationRuleContract {
  return {
    name: "same",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      if (value === v.getAttributeValue(anotherAttr)) {
        return true;
      }

      return false;
    },
  };
}
