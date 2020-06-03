import { assertEquals } from "../test_deps.ts";

import { array } from "../rules/array_rule.ts";

Deno.test("rules:array", function (): void {
  const ruleHandler = array({}).handler;
  assertEquals(ruleHandler([]), true);
  assertEquals(ruleHandler({}), false);
});
