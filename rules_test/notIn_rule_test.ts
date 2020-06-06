import { assertEquals } from "../test_deps.ts";

import { notIn } from "../rules/notIn_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:notIn", function (): void {
  const ruleHandler = notIn(["notIn"]).handler;
  assertEquals(
    ruleHandler(
      "public",
      new ValidatorLite({ notIn: "private,draft" }),
    ),
    true,
  ),
    assertEquals(
      ruleHandler(
        "draft",
        new ValidatorLite({ notIn: "private,draft" }),
      ),
      false,
    );
});
