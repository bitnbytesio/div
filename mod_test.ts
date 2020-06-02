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
  },
);
