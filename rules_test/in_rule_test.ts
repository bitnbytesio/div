import { assertEquals } from "../test_deps.ts";

import { _in } from "../rules/in_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:in", function (): void {
  const ruleHandler = _in(["in"]).handler;
  assertEquals(
    ruleHandler(
      "public",
      new ValidatorLite({ in: "private,public,draft" }),
    ),
    true,
  ),
    assertEquals(
      ruleHandler(
        "public",
        new ValidatorLite({ in: "public" }),
      ),
      true,
    ),
    assertEquals(
      ruleHandler(
        "draft",
        new ValidatorLite({ in: "public,private" }),
      ),
      false,
    );
});
