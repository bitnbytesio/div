export interface ValidationRuleContract {
  name: string;
  handler: Function;
  args?: any;
  nullable?: boolean;
}

export interface ValidationRulesContract {
  [key: string]: Array<ValidationRuleContract>;
}

export interface ValidationRuleStringNotationContract {
  [key: string]: string;
}


export interface ValidatorContract {
  getAttributeValue(attrName: string): any;
}
