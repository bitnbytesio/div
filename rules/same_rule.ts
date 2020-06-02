import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function same(
  args: Array<string>,
): ValidationRuleContract {
  return {
    name: "same",
    handler: (value: any, inputs: any) => {
      const [anotherAttr] = args;

      if (value === inputs[anotherAttr]) {
        return true;
      }

      return false;
    },
  };
}
