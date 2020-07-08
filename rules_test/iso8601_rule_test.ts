import { assertEquals } from "../test_deps.ts";

import { iso8601 } from "../rules/iso8601_rule.ts";

Deno.test("rules:iso8601", function (): void {
  const ruleHandler = iso8601().handler;
  assertEquals(ruleHandler("2019-01-07T10:43:59Z"), true);
  assertEquals(ruleHandler("Yes, Node is awesome"), false);
});
