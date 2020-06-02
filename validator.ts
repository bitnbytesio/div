import { ValidatorError } from "./contracts/validator_error.ts";
import { Messages } from "./contracts/message.ts";
import {
  ValidationRule,
  ValidationRules,
} from "./contracts/validation_rule.ts";

import { NiceNames } from "./contracts/nicenames.ts";

export class Validator {
  errors: ValidatorError = {};

  niceNames: NiceNames = {};

  constructor(
    private inputs: any,
    private rules: ValidationRules = {},
    private messages: Messages = {},
  ) {
  }

  /**
   * change attribute names in error messages
   * @param niceNames attribute nice names
   */
  setNiceNames(niceNames: NiceNames) {
    this.niceNames = niceNames;
  }

  /**
   * create validator
   * @param inputs inputs
   */
  static create(inputs: any = {}) {
    const v = new Validator(inputs);
    return v;
  }

  /**
   * apply this set of rules to inputs
   * @param rules set of rules
   */
  applyRules(rules: ValidationRules) {
    this.rules = rules;
  }

  /**
   * apply this set of filters to inputs
   * @param filters set of filters
   */
  applyFilters(filters: any) {
    // future ref
  }

  /**
   * apply post validation rules
   * @param rules post rules
   */
  applyPostRules(rules: any) {
    // future ref
  }

  /**
   * validate inputs againest rules
   */
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

  /**
   * get attribute value by its name
   * @param attr attribute name
   */
  getAttributeValue(attr: string): string {
    return this.inputs[attr] || null;
  }

  /**
   * does we have any dirty/failed input
   */
  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * this will create error object for attribute
   * @param attrName attribute name
   * @param ruleName rule name
   * @param value attribute value
   */
  createAttributeError(attrName: string, ruleName: string, value?: any): void {
    this.errors[attrName] = {
      rule: ruleName,
      message: this.createAttributeErrorMessage(attrName, ruleName, value),
    };
  }

  /**
   * this will return parsed error message as per rule or input
   * @param attrName attribute name
   * @param ruleName rule name
   * @param value attribute value
   */
  createAttributeErrorMessage(
    attrName: string,
    ruleName: string,
    value?: any,
  ): string {
    return `The ${attrName} validation failed using rule ${ruleName} againest ${value}`;
  }
}
