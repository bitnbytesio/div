export interface ValidationRule {
  name: string;
  handler: Function;
}

export interface ValidationRules {
  [key: string]: Array<ValidationRule>;
}
