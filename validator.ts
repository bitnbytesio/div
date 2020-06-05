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
import { getKeyValue, getValueByStringNotation, getValuesByWildCardStringNotation } from "./util/obj_util.ts";
import { reallyEmpty } from "./util/ops_util.ts";

import * as RulesProvider from "./rules/mod.ts";

interface AttributeValidationMinimalInfo {
  attrName: string;
  ruleName: string;
  attrValue?: any;
  ruleArgs?: any;
}

const implicitRules = [
  "required",
  "requiredIf",
  "requiredNotIf",
  "requiredWith",
  "requiredWithout",
  "accepted",
  "sometimes",
  "nullable",
];

export class Validator {
  errors: ValidatorErrorContract = {};

  niceNames: NiceNamesContract = {};

  hasCustomMessages: boolean = false;

  notationMap: any = {};
  notationVals: any = {};

  hasNestedRules: boolean = false;

  parsedRulesCollection: ValidationRulesContract | ValidationRuleStringNotationContract = {};

  constructor(
    private inputs: any,
    private rules:
      | ValidationRulesContract
      | ValidationRuleStringNotationContract = {},
    private customMessages: MessagesContract = {},
  ) {
    this.hasCustomMessages = Object.keys(customMessages).length > 0;
    this.parse();
  }

  parse() {
    this.parseRules();
    this.parseInputs();
  }

  parseInputs() {
    if (!this.hasNestedRules) {
      return;
    }

    const { notationMap, notationsVals } = getValuesByWildCardStringNotation(this.inputs);
    this.notationMap = notationMap;
    this.notationVals = notationsVals;

    Object.keys(this.notationMap).forEach((key) => {
      const attrRules = this.rules[key];
      if (attrRules) {
        this.notationMap[key].forEach((attrName: string) => {
          this.parsedRulesCollection[attrName] = attrRules;
        });
      }
    });
  }

  parseRules() {
    let attr: string;

    for (attr of Object.keys(this.rules)) {
      if (attr.indexOf('.')) {
        this.hasNestedRules = true;
      } else {
        this.parsedRulesCollection[attr] = this.rules[attr];
      }
    }
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
    this.parse();
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
    // console.log('validate called');
    // console.log(this.inputs, this.rules, this.parsedRulesCollection, this.notationVals, this.notationMap);
    // console.log('Woops');
    Object.keys(this.parsedRulesCollection).forEach((attrName) => {
      const attrRules = this.parsedRulesCollection[attrName];

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

      const ruleProvider = getKeyValue(ruleName)(RulesProvider);

      if (!ruleProvider) {
        throw new Error(`Rule ${ruleName} does not exists.`);
      }

      const ruleObj = ruleProvider(args);

      // if (implicitRules.indexOf(ruleName) >= 0) {
      //   rulesArr.unshift(ruleObj);
      //   return;
      // }

      rulesArr.push(ruleObj);
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
    attrRules.sort((obj) => {
      return (implicitRules.indexOf(obj.name) >= 0) ? -1 : 1;
    });

    attrRules.forEach((validationRule: ValidationRuleContract) => {
      const attrValue = this.getAttributeValue(attrName);

      if (
        // rule is implicit and attribute value is empty
        (implicitRules.indexOf(validationRule.name) < 0 &&
          reallyEmpty(attrValue)) ||
        // attribute can be nullable
        (validationRule.name === "nullable" && attrValue === null) ||
        // attribute will only be validated if presents
        (validationRule.name === "sometimes" &&
          this.didAttributeHasValue(attrValue) === false)
      ) {
        return;
      }
      // console.log('attr val', attrValue);
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
    return this.inputs[attr] || this.notationVals[attr];
  }

  didAttributeHasValue(attr: string): boolean {
    return this.getAttributeValue(attr) === undefined ? true : false;
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
