import { assertEquals } from "../test_deps.ts";
import { dateAfter } from "../rules/date_after_rule.ts";

Deno.test("rules:dateAfter", function (): void {
  const ruleHandler = dateAfter(["20-05-2020"]).handler;
  assertEquals(ruleHandler("20-06-2020"), true);
  assertEquals(ruleHandler("20-04-2020"), false);
});
