import { assertEquals } from "./test_deps.ts";
import { Validator, Rules } from "./mod.ts";
import "./rules_test/mod_test.ts";

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
