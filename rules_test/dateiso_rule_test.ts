import { assertEquals } from "../test_deps.ts";
import { date } from "../rules/dateiso_rule.ts";

Deno.test("rules:date", function (): void {
  const ruleHandler = date([]).handler;
  assertEquals(ruleHandler("2019-07-01T10:10:00"), true);
  assertEquals(ruleHandler("2019-07-01T10:10:00.00Z"), true);
  assertEquals(ruleHandler("01/26/2018"), false);
  assertEquals(ruleHandler("12 12 18"), false);
});
