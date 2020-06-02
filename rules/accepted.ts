import { ValidationRule } from "../contracts/validation_rule.ts";

export function accepted(
  args: Array<string> = ["true", "1", "yes", "on"],
): ValidationRule {
  return {
    name: "accepted",
    handler: (value: any) => {
      if (args.indexOf(String(value)) >= 0) {
        return true;
      }
      return false;
    },
  };
}
