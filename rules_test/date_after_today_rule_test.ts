import { assertEquals } from "../test_deps.ts";
import { dateDaysAfterToday } from "../rules/date_after_today_rule.ts";

Deno.test("rules:dateAfterToday", function (): void {
  const ruleHandler = dateDaysAfterToday(["20-05-2020"]).handler;
  assertEquals(ruleHandler("20-06-2020"), true);
  assertEquals(ruleHandler("20-04-2020"), false);
});
