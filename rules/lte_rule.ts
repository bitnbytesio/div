import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function lte(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "lte",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      const anotherAttrVal = v.getAttributeValue(anotherAttr);

      if (Number(value) <= Number(anotherAttrVal)) {
        return true;
      }

      return false;
    },
  };
}
