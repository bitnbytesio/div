import { assertEquals } from "../test_deps.ts";

import { notContains } from "../rules/notContains_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:notContains", function (): void {
  const ruleHandler = notContains(["notContains"]).handler;
  assertEquals(
    ruleHandler(
      "This library is awesome.",
      new ValidatorLite({ notContains: "package" }),
    ),
    true,
  );
  assertEquals(
    ruleHandler(
      "Yes, Deno is awesome",
      new ValidatorLite({ notContains: "Yes" }),
    ),
    false,
  );
});
