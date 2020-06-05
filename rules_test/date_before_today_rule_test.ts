import { assertEquals } from "../test_deps.ts";
import { dateBeforeToday } from "../rules/date_before_today_rule.ts";

Deno.test("rules:dateBeforeToday", function (): void {
  const ruleHandler = dateBeforeToday(["20-05-2020"]).handler;
  assertEquals(ruleHandler("20-04-2020"), true);
  assertEquals(ruleHandler("20-06-2020"), false);
});
