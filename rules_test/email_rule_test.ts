import { assertEquals } from "../test_deps.ts";

import { email } from "../rules/email_rule.ts";

Deno.test("rules:email", function (): void {
  const ruleHandler = email().handler;
  assertEquals(ruleHandler("user@example.com"), true);
  assertEquals(ruleHandler("form@example"), false);
});
