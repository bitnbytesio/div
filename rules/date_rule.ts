import { moment } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function date(args: Array<any>): ValidationRuleContract {
  return {
    name: "date",
    handler: (value: any) => {
      const [format = "YYYY-MM-DD"] = args;
      if (!moment(value, format, true).isValid()) {
        return false;
      }

      return true;
    },
  };
}
