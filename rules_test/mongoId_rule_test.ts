import { assertEquals } from "../test_deps.ts";

import { mongoId } from "../rules/mongoId_rule.ts";

Deno.test("rules:mongoId", function (): void {
  const ruleHandler = mongoId().handler;
  assertEquals(ruleHandler("5c33010638eb95186574b64a"), true);
  assertEquals(ruleHandler("1945690"), false);
});
