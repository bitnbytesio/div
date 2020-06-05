import { assertEquals } from "../test_deps.ts";

import { decimal } from "../rules/decimal_rule.ts";

Deno.test("rules:decimal", function (): void {
  const ruleHandler = decimal().handler;
  assertEquals(ruleHandler("12.50"), true);
  assertEquals(ruleHandler(12.55), true);
  assertEquals(ruleHandler(12), true);
  assertEquals(ruleHandler(0), true);
  assertEquals(ruleHandler("0"), true);
  assertEquals(ruleHandler("abc"), false);
});
