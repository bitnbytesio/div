import { assertEquals } from "../test_deps.ts";

import { alpha } from "../rules/alpha_rule.ts";

Deno.test("rules:alpha", function (): void {
  const ruleHandler = alpha().handler;
  assertEquals(ruleHandler("yes"), true);
  assertEquals(ruleHandler("123"), false);
});
