import { assertEquals } from "../test_deps.ts";

import { same } from "../rules/same_rule.ts";

Deno.test("rules:same", function (): void {
  const ruleHandler = same(["confirmPassword"]).handler;
  assertEquals(ruleHandler("123456", { confirmPassword: "123456" }), true);
  assertEquals(ruleHandler("123456", { confirmPassword: "123123" }), false);
});
