import { assertEquals } from "../test_deps.ts";

import { equals } from "../rules/equals_rule.ts";

Deno.test("rules:equals", function (): void {
  const ruleHandler = equals(["yes"]).handler;
  assertEquals(ruleHandler("yes"), true);
  assertEquals(ruleHandler("Yes, Deno is awesome"), false);
});
