import { assertEquals } from "../test_deps.ts";

import { required } from "../rules/required_rule.ts";

Deno.test("rules:required", function (): void {
  const ruleHandler = required().handler;
  assertEquals(ruleHandler("yes"), true);
  assertEquals(ruleHandler("true"), true);
  assertEquals(ruleHandler(true), true);
  assertEquals(ruleHandler(false), true);
  assertEquals(ruleHandler("0"), true);
  assertEquals(ruleHandler(0), true);
  assertEquals(ruleHandler(""), false);
  assertEquals(ruleHandler(), false);
  assertEquals(ruleHandler(null), false);
});
