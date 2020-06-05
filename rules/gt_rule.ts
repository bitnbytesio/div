import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function gt(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "gt",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      if (value > v.getAttributeValue(anotherAttr)) {
        return true;
      }

      return false;
    },
  };
}
