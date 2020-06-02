export interface ValidatorErrorAttributeContract {
  message: string;
  rule: string;
}

export interface ValidatorErrorContract {
  [key: string]: ValidatorErrorAttributeContract;
}
