import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";
import { moment } from "../deps.ts";
import { dateFormats } from "../util/date_util.ts";

export function validateBefore(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "validateBefore",
    handler: (value: any) => {
      const [beforeDate] = args;
      const mBeforeDate = moment(beforeDate, dateFormats);
      const mDate = moment(value, dateFormats);

      if (
        !mBeforeDate.isValid() || !mDate.isValid() ||
        mBeforeDate.valueOf() < mDate.valueOf()
      ) {
        return false;
      }

      return true;
    },
  };
}
