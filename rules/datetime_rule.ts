import { moment } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function date(args: Array<any>): ValidationRuleContract {
  return {
    name: "date",
    handler: (value: any) => {
      if (!moment(value, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
        return false;
      }

      return true;
    },
  };
}
