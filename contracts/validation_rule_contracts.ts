export interface ValidationRuleContract {
  name: string;
  handler: Function;
  args?: any;
}

export interface ValidationRulesContract {
  [key: string]: Array<ValidationRuleContract>;
}

export interface ValidationRuleStringNotationContract {
  [key: string]: string;
}
