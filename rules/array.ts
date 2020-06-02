import { ValidationRule } from '../contracts/ValidationRule.ts';

export const array = (value: any): ValidationRule => {
    return {
        name: 'array',
        handler: (value: any) => {
            return Array.isArray(value);
        }
    }
};
