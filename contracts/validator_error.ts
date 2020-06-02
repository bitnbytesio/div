export interface ValidatorErrorAttribute {
  message: string;
  rule: string;
}

export interface ValidatorError {
  [key: string]: ValidatorErrorAttribute;
}
