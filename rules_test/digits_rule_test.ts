import { assertEquals } from "../test_deps.ts";

import { digits } from "../rules/digits_rule.ts";

Deno.test("rules:digits", function (): void {
  const ruleHandler = digits(["5"]).handler;
  assertEquals(ruleHandler(12345), true);
  assertEquals(ruleHandler("12345"), true);
  assertEquals(ruleHandler(123), false);
  assertEquals(ruleHandler(123456), false);
  assertEquals(ruleHandler("123"), false);
  assertEquals(ruleHandler("123456"), false);
});
