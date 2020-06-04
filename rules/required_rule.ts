import { ValidationRuleContract } from "../contracts/validation_rule_contracts.ts";

import { reallyEmpty } from "../util/ops_util.ts";

export function required(): ValidationRuleContract {
  return {
    name: "required",
    handler: (value: any): boolean => {
      return reallyEmpty(value) === false;
    },
  };
}
