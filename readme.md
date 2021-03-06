# DIV (Deno Input Validator)

DIV is a validation library for [Deno](https://deno.land/) inspired by [node-input-validator](https://www.npmjs.com/package/node-input-validator).

- [Getting Started](#getting-started)
- [Rules](#rules)


## Getting Started 

```ts
import { Validator, ValidationRules } from 'https://deno.land/x/div/mod.ts';

const v = new Validator(
  { email: 'email@example.com' },
  {
    email: [ 
      ValidationRules.required(),
      ValidationRules.email(),
    ],
  }
)

if (v.validate()) {
  // validation passed
} else {
  // validation failed
}
```

## Rules

**accepted**  
The field under validation must be yes, on, 1, or true.

## Authors

- [Dinesh Khurana](https://github.com/dineshkhurana333)
- [Harcharan Singh](https://github.com/bitnbytesio)
