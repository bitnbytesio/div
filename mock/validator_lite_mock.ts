import { ValidatorContract } from "../contracts/validation_rule_contracts.ts";

export class ValidatorLite implements ValidatorContract {
  constructor(private inputs: any) {}

  getAttributeValue(attrName: string): any {
    return this.inputs[attrName];
  }
}
