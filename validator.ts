import { ValidatorErrorContract } from "./contracts/validator_error.ts";
import { MessagesContract } from "./contracts/message.ts";
import {
  ValidationRuleContract,
  ValidationRulesContract,
} from "./contracts/validation_rule.ts";

import { NiceNamesContract } from "./contracts/nicenames.ts";

import * as Messages from "./messages/mod.ts";

export class Validator {
  errors: ValidatorErrorContract = {};

  niceNames: NiceNamesContract = {};

  constructor(
    private inputs: any,
    private rules: ValidationRulesContract = {},
    private messages: MessagesContract = {},
  ) {
  }

  /**
   * change attribute names in error messages
   * @param niceNames attribute nice names
   */
  setNiceNames(niceNames: NiceNamesContract) {
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
  applyRules(rules: ValidationRulesContract) {
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
        attrRules.forEach((validationRule: ValidationRuleContract) => {
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
