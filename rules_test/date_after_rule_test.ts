import { assertEquals } from "../test_deps.ts";
import { dateAfter } from "../rules/date_after_rule.ts";

Deno.test("rules:dateAfter", function (): void {
  const ruleHandler = dateAfter([]).handler;
  assertEquals(ruleHandler("20-12-2020"), true);
  assertEquals(ruleHandler("20-12-2020"), false);
});
