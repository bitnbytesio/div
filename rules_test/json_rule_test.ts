import { assertEquals } from "../test_deps.ts";

import { json } from "../rules/json_rule.ts";

Deno.test("rules:json", function (): void {
  const ruleHandler = json().handler;
  assertEquals(ruleHandler("[1, 2, 3]"), true);
  assertEquals(ruleHandler("string"), false);
});
