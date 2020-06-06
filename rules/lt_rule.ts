import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function lt(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "lt",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      const anotherAttrVal = v.getAttributeValue(anotherAttr);

      if (Number(value) < Number(anotherAttrVal)) {
        return true;
      }

      return false;
    },
  };
}
