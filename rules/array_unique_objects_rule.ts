import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function arrayUniqueObjects(
  value: any,
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "arrayUniqueObjects",
    handler: (value: any) => {
      if (!Array.isArray(value)) {
        return false;
      }

      const result = new Set(value.map((o) => {
        let output = "";

        // eslint-disable-next-line no-restricted-syntax
        for (const attr of args) {
          output += o[attr];
        }

        return output;
      }));
      return result.size === value.length;
    },
  };
}
