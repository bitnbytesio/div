import { assertEquals } from "../test_deps.ts";
import { date } from "../rules/dateiso_rule.ts";

Deno.test("rules:date", function (): void {
  const ruleHandler = date([]).handler;
  assertEquals(ruleHandler("2019-07-01 10:10:00"), true);
  assertEquals(ruleHandler("01/26/2018"), false);
});
