import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function boolean(
  args: Array<boolean> = [true, false],
): ValidationRuleContract {
  return {
    name: "boolean",
    handler: (value: any) => {
      if (args.indexOf(value) >= 0) {
        return true;
      }
      return false;
    },
  };
}
