import { assertEquals } from "../test_deps.ts";

import { latLong } from "../rules/latLong_rule.ts";

Deno.test("rules:latLong", function (): void {
  const ruleHandler = latLong().handler;
  assertEquals(ruleHandler("30.483997,76.593948"), true);
  assertEquals(ruleHandler("Yes, Node is awesome"), false);
});
