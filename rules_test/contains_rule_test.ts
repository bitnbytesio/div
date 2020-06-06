import { assertEquals } from "../test_deps.ts";

import { contains } from "../rules/contains_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:contains", function (): void {
  const ruleHandler = contains(["contains"]).handler;
  assertEquals(
    ruleHandler(
      "This package is awesome.",
      new ValidatorLite({ contains: "package" }),
    ),
    true,
  );
  assertEquals(
    ruleHandler("Yes, Node is awesome", new ValidatorLite({ contains: "yes" })),
    false,
  );
});
