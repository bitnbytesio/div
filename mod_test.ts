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
  "validator:validate rules in string notation",
  function (): void {
    const v = new Validator(
      { tandc: "yes" },
      { tandc: "accepted" },
    );
    const passed = v.validate();
    assertEquals(passed, true);

    const vF = new Validator(
      { tandc: "no" },
      { tandc: "accepted" },
    );
    const passedF = vF.validate();
    assertEquals(passedF, false);

    // console.log(vF.getErrors());
  },
);
