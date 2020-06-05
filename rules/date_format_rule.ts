import { moment } from "../deps.ts";
import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

export function dateFormat(args: Array<any>): ValidationRuleContract {
  return {
    name: "dateFormat",
    handler: (value: any) => {
      const [format] = args;
      if (!moment(value, format, true).isValid()) {
        return false;
      }

      return true;
    },
  };
}
