import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function equals(args: Array<any>): ValidationRuleContract {
  return {
    name: "equals",
    handler: (value: any) => {
      if (value !== args[0]) {
        return false;
      }

      return true;
    },
  };
}
