import { ValidatorError } from "./contracts/validator_error.ts";
import { Messages } from "./contracts/message.ts";
import {
  ValidationRule,
  ValidationRules,
} from "./contracts/validation_rule.ts";

export class Validator {
  errors: ValidatorError = {};

  constructor(
    private inputs: any,
    private rules: ValidationRules,
    private messages: Messages = {},
  ) {
  }

  validate(): boolean {
    Object.keys(this.rules).forEach((attrName) => {
      const attrRules = this.rules[attrName];

      if (Array.isArray(attrRules)) {
        attrRules.forEach((validationRule: ValidationRule) => {
          const value = this.getAttributeValue(attrName);
          if (!validationRule.handler(value)) {
            this.createAttributeError(attrName, validationRule.name, value);
          }
        });
      }
    });

    return !this.hasErrors();
  }

  getAttributeValue(attr: string): string {
    return this.inputs[attr] || null;
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  createAttributeError(attrName: string, ruleName: string, value?: any): void {
    this.errors[attrName] = {
      rule: ruleName,
      message: this.createAttributeErrorMessage(attrName, ruleName, value),
    };
  }

  createAttributeErrorMessage(
    attrName: string,
    ruleName: string,
    value?: any,
  ): string {
    return `The ${attrName} validation failed using rule ${ruleName} againest ${value}`;
  }
}
