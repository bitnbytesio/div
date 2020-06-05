import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function different(args: Array<any>): ValidationRuleContract {
  return {
    name: "different",
    handler: (value: any, v: any) => {
      if (!args.length) {
        throw new Error("Invalid number of arguments");
      }

      const [otherInput] = args;

      const otherValue = v[otherInput];

      if (otherValue === value) {
        return false;
      }

      return true;
    },
  };
}
