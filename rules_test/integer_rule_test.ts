import { assertEquals } from "../test_deps.ts";

import { integer } from "../rules/integer_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:integer", function (): void {
  const ruleHandler = integer().handler;
  assertEquals(ruleHandler("12"), true);
  assertEquals(ruleHandler(12), true);
  assertEquals(ruleHandler("12.5"), false);
  assertEquals(ruleHandler("draft"), false);
});
