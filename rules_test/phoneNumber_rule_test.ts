import { assertEquals } from "../test_deps.ts";

import { phoneNumber } from "../rules/phoneNumber_rule.ts";

Deno.test("rules:phoneNumber", function (): void {
  const ruleHandler = phoneNumber().handler;
  assertEquals(ruleHandler("+918699987073"), true);
  assertEquals(ruleHandler("+1-541-754-3010"), true);
  assertEquals(ruleHandler("draft"), false);
});
