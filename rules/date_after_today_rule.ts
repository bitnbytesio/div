import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";
import { moment } from "../deps.ts";
import { dateFormats } from "../util/date_util.ts";

export function dateDaysAfterToday(args: Array<any>): ValidationRuleContract {
  return {
    name: "dateAfterToday",
    handler: (value: any) => {
      // after date moment object
      const mAfterDate = moment().add(args[0], args[1] || 'days');
      // input date moment object
      const mDate = moment(value, dateFormats);

      /* istanbul ignore next */
      if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() > mDate.valueOf()) {
        return false;
      }

      return true;
    },
  };
}
