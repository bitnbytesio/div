import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts/validation_rule_contracts.ts";

export function gte(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "gte",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      const anotherAttrVal = v.getAttributeValue(anotherAttr);

      if (Number(value) >= Number(anotherAttrVal)) {
        return true;
      }

      return false;
    },
  };
}
