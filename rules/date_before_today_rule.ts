import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";
import { moment } from "../deps.ts";
import { dateFormats } from "../util/date_util.ts";

export function dateBeforeToday(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "dateBeforeToday",
    handler: (value: any) => {
      // after date moment object
      const mAfterDate = moment().subtract(args[0], args[1] || 'days');
      // input date moment object
      const mDate = moment(value, dateFormats);

      if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() < mDate.valueOf()) {
        return false;
      }

      return true;
    },
  };
}
