import { assertEquals } from "../test_deps.ts";

import { creditCard } from "../rules/creditCard_rule.ts";

Deno.test("rules:creditCard", function (): void {
  const ruleHandler = creditCard().handler;
  assertEquals(ruleHandler("4111111111111111"), true);
  assertEquals(ruleHandler("4111 1111 1111 1111"), true);
  assertEquals(ruleHandler("5500 0000 0000 0004"), true);
  assertEquals(ruleHandler("3400 0000 0000 009"), true);
  assertEquals(ruleHandler("412365"), false);
});
