import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { dateFormats } from "../util/date_util.ts";

export function dateAfter(args: Array<any>): ValidationRuleContract {
  return {
    name: "dateAfter",
    handler: (value: any) => {
      const [afterDate] = args;

      const mAfterDate = moment(afterDate, dateFormats);
      const mDate = moment(value, dateFormats);

      if (
        !mAfterDate.isValid() || !mDate.isValid() ||
        mAfterDate.valueOf() > mDate.valueOf()
      ) {
        return false;
      }

      return true;
    },
  };
}
