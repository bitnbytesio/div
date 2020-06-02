import { ValidationRule } from "../contracts/validation_rule.ts";

export const array = (value: any): ValidationRule => {
  return {
    name: "array",
    handler: (value: any) => {
      return Array.isArray(value);
    },
  };
};
