import { assertEquals } from "./test_deps.ts";
import { Validator, Rules } from "./mod.ts";

Deno.test(
  "validator:validate",
  function (): void {
    const v = new Validator(
      { tandc: "yes" },
      { tandc: [Rules.accepted()] },
    );
    const passed = v.validate();
    assertEquals(passed, true);

    const vF = new Validator(
      { tandc: "no" },
      { tandc: [Rules.accepted()] },
    );
    const passedF = vF.validate();
    assertEquals(passedF, false);

    // console.log(vF.getErrors());
  },
);

Deno.test(
  "validator:implicit:required",
  function (): void {
    let v = new Validator(
      { tandc: "yes" },
      { tandc: [Rules.alpha()] },
    );
    let passed = v.validate();
    assertEquals(passed, true);

    v = new Validator(
      { tandc: "" },
      { tandc: [Rules.alpha()] },
    );
    passed = v.validate();
    assertEquals(passed, true);

    v = new Validator(
      { tandc: undefined },
      { tandc: [Rules.alpha()] },
    );
    passed = v.validate();
    assertEquals(passed, true);

    v = new Validator(
      { tandc: false },
      { tandc: [Rules.string(), Rules.alpha()] },
    );
    passed = v.validate();
    assertEquals(passed, false);

    v = new Validator(
      { tandc: "" },
      { tandc: [Rules.required(), Rules.alpha()] },
    );
    passed = v.validate();
    assertEquals(passed, false);

    v = new Validator(
      { tandc: "" },
      { tandc: [Rules.alpha(), Rules.required()] },
    );
    passed = v.validate();
    assertEquals(passed, false);

    v = new Validator(
      { tandc: "yes" },
      { tandc: [Rules.string(), Rules.alpha(), Rules.required()] },
    );
    passed = v.validate();
    assertEquals(passed, true);
  },
);

Deno.test(
  "validator:1 level nested rules",
  function (): void {
    // should pass
    let v = new Validator(
      { user: { name: "Deno" } },
      { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
    );
    let passed = v.validate();
    assertEquals(passed, true);

    // shoud fail as per alpha
    v = new Validator(
      { user: { name: "123" } },
      { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
    );
    passed = v.validate();
    assertEquals(passed, false);
    assertEquals(v.errors["user.name"].rule, "alpha");

    // should fail of required as of empty object
    v = new Validator(
      { user: {} },
      { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
    );
    passed = v.validate();
    assertEquals(passed, false);
    assertEquals(v.errors["user.name"].rule, "required");

    // should fail of required as of string instead of object
    v = new Validator(
      { user: "test" },
      { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
    );
    passed = v.validate();
    assertEquals(passed, false);
    assertEquals(v.errors["user.name"].rule, "required");

    v = new Validator(
      { user: { name: "123" } },
      {
        user: [Rules.required()],
        "user.name": [Rules.string(), Rules.alpha()],
      },
    );
    passed = v.validate();
    assertEquals(passed, false);
    assertEquals(v.errors["user.name"].rule, "alpha");
  },
);

Deno.test(
  "validator:1 level nested rules with undefined value",
  function (): void {
    // should fail of required as of undefined value
    let v = new Validator(
      { user: undefined },
      {
        "user.name": [Rules.string(), Rules.alpha(), Rules.required()],
      },
    );
    let passed = v.validate();
    assertEquals(passed, false);
    assertEquals(v.errors["user.name"].rule, "required");

    v = new Validator(
      { user: undefined },
      {
        "user.name": [Rules.string(), Rules.alpha()],
      },
    );
    passed = v.validate();
    assertEquals(passed, true);

    v = new Validator(
      { user: undefined },
      {
        user: [Rules.required()],
        "user.name": [Rules.string(), Rules.alpha()],
      },
    );
    passed = v.validate();
    assertEquals(passed, false);
  },
);

Deno.test(
  "validator:1 level nested rules with empty {} value",
  function (): void {
    // should fail of required as of empty input
    let v = new Validator(
      {},
      { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
    );
    let passed = v.validate();
    assertEquals(passed, false);
    assertEquals(v.errors["user.name"].rule, "required");

    v = new Validator(
      {},
      { "user.name": [Rules.string(), Rules.alpha()] },
    );
    passed = v.validate();
    assertEquals(passed, true);
  },
);

Deno.test(
  "validator:3 level nested rules",
  function (): void {
    // check 3 level nesting
    let v = new Validator(
      { user: { name: "Deno", address: { city: "rajpura" } } },
      {
        "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
      },
    );
    let passed = v.validate();
    assertEquals(passed, true);
  },
);

Deno.test(
  "validator:wild card level",
  function (): void {
    // check 3 level nesting
    let v = new Validator(
      {
        products: {
          name: "Deno",
          attributes: [
            {
              colors: ["#fff", "#000"],
            },
          ],
        },
      },
      {
        "products.name": [Rules.string(), Rules.alpha(), Rules.required()],
        "products.attributes.*.colors": [Rules.array(), Rules.required()],
        "products.attributes.*.colors.*": [
          Rules.string(),
          Rules.alpha(),
          Rules.required(),
        ],
      },
    );
    let passed = v.validate();
    assertEquals(passed, true);
  },
);

// Deno.test(
//   "validator:validate rules in string notation",
//   function (): void {
//     const v = new Validator(
//       { tandc: "yes" },
//       { tandc: "accepted" },
//     );
//     const passed = v.validate();
//     assertEquals(passed, true);

//     const vF = new Validator(
//       { tandc: "no" },
//       { tandc: "accepted" },
//     );
//     const passedF = vF.validate();
//     assertEquals(passedF, false);

//     // console.log(vF.getErrors());
//   },
// );
