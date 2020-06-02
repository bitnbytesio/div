import { assertEquals } from "../test_deps.ts";

import { accepted } from "../rules/accepted_rule.ts";

Deno.test("rules:accepted", function (): void {
  const ruleHandler = accepted().handler;
  assertEquals(ruleHandler("yes"), true);
  assertEquals(ruleHandler("no"), false);
});
