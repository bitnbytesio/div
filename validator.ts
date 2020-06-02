import { ValidatorErrorContract } from "./contracts/validator_error_contracts.ts";
import { MessagesContract } from "./contracts/message_contracts.ts";
import {
  ValidationRuleContract,
  ValidationRulesContract,
  ValidationRuleStringNotationContract,
} from "./contracts/validation_rule_contracts.ts";

import { NiceNamesContract } from "./contracts/nicenames_contracts.ts";

import * as MessagesProvider from "./messages/mod.ts";

import { messageParser } from "./util/message_parser_util.ts";

import * as RulesProvider from "./rules/mod.ts";

interface AttributeValidationMinimalInfo {
  attrName: string;
  ruleName: string;
  attrValue?: any;
  ruleArgs?: any;
}

export class Validator {
  errors: ValidatorErrorContract = {};

  niceNames: NiceNamesContract = {};

  hasCustomMessages: boolean = false;

  constructor(
    private inputs: any,
    private rules:
      | ValidationRulesContract
      | ValidationRuleStringNotationContract = {},
    private customMessages: MessagesContract = {},
  ) {
    this.hasCustomMessages = Object.keys(customMessages).length > 0;
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

      if (!attrRules) {
        return;
      }

      if (Array.isArray(attrRules)) {
        this.validateAttribute(attrName, attrRules);
        return;
      }

      this.validateAttribute(
        attrName,
        this.parseStringNotationRules(attrRules),
      );
    });

    return !this.hasErrors();
  }

  /**
   * parse rules those are in string notation
   * @param attrRules attribute string rules
   */
  parseStringNotationRules(attrRules: string): Array<ValidationRuleContract> {
    const rulesStrArr = attrRules.split("|");

    const rulesArr: Array<ValidationRuleContract> = [];

    rulesStrArr.forEach((ruleStr) => {
      const ruleNameAndArgs: Array<string> = ruleStr.split(":");
      const [ruleName, ruleArgsStr] = ruleNameAndArgs;

      let args;

      if (ruleArgsStr) {
        args = ruleArgsStr.split(",");
      }

      const getKeyValue = (key: string) => (obj: any) => obj[key];

      const ruleObj = getKeyValue(ruleName)(RulesProvider);

      if (!ruleObj) {
        throw new Error(`Rule ${ruleName} does not exists.`);
      }

      rulesArr.push(ruleObj(args));
    });

    return rulesArr;
  }

  /**
   * apply rules on attribute
   * @param attrName attribute name
   * @param attrRules attribute rules
   */
  validateAttribute(
    attrName: string,
    attrRules: Array<ValidationRuleContract>,
  ) {
    attrRules.forEach((validationRule: ValidationRuleContract) => {
      const attrValue = this.getAttributeValue(attrName);

      if (!validationRule.handler(attrValue)) {
        this.createAttributeError({
          attrName,
          attrValue,
          ruleName: validationRule.name,
          ruleArgs: validationRule.args,
        });
      }
    });
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

  getErrors(): any {
    return this.errors;
  }

  /**
   * this will create error object for attribute
   * @param params info object
   */
  createAttributeError(params: AttributeValidationMinimalInfo): void {
    const { attrName, ruleName } = params;
    this.errors[attrName] = {
      rule: ruleName,
      message: this.createAttributeErrorMessage(params),
    };
  }

  /**
   * this will return parsed error message as per rule or input
   * @param params object with attr and rule name, value, args
   */
  createAttributeErrorMessage(
    params: AttributeValidationMinimalInfo,
    useDefaultMessage: boolean = true,
  ): string {
    const { attrName, ruleName, attrValue, ruleArgs } = params;

    const messagesCollection: any = MessagesProvider.en.messages;
    const defaultMessage = messagesCollection.$default;

    let message;

    // check for local scope messages
    if (this.hasCustomMessages) {
      message = this.customMessages[`${attrName}.${ruleName}`] ||
        this.customMessages[ruleName] ||
        this.customMessages[attrName];
    }

    // not found in local scope, check for global scope
    if (!message) {
      message = (messagesCollection.$custom &&
        messagesCollection.$custom[`${attrName}.${ruleName}`]) ||
        messagesCollection[ruleName] ||
        (messagesCollection.$custom && messagesCollection.$custom[attrName]);

      if (useDefaultMessage && !message) {
        message = defaultMessage;
      }
    }

    let attributeName = attrName;

    // check if we have nice name in local scope
    if (this.niceNames[attrName]) {
      attributeName = this.niceNames[attrName];
    } else if (
      messagesCollection.$niceNames && messagesCollection.$niceNames[attrName]
    ) {
      // check if we have nice name in global scope
      attributeName = messagesCollection.$niceNames[attrName];
    }

    return messageParser({
      message,
      attrName: attributeName,
      ruleName,
      attrValue,
      ruleArgs,
    });
  }
}
