export interface ValidationRuleContract {
  name: string;
  handler: Function;
}

export interface ValidationRulesContract {
  [key: string]: Array<ValidationRuleContract>;
}
