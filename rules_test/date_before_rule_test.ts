import { assertEquals } from "../test_deps.ts";
import { validateBefore } from "../rules/date_before_rule.ts";

Deno.test("rules:validateBefore", function (): void {
  const ruleHandler = validateBefore(["20-05-2020"]).handler;
  assertEquals(ruleHandler("20-04-2020"), true);
  assertEquals(ruleHandler("20-06-2020"), false);
});
