import { assertEquals } from "../test_deps.ts";

import { boolean } from "../rules/boolean_rule.ts";

Deno.test("rules:boolean", function (): void {
  const ruleHandler = boolean().handler;
  assertEquals(ruleHandler(true), true);
  assertEquals(ruleHandler("false"), false);
});
