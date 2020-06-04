import { assertEquals } from "../test_deps.ts";
import { date } from "../rules/date_rule.ts";

Deno.test("rules:date", function (): void {
  const ruleHandler = date([]).handler;
  assertEquals(ruleHandler("2019-12-24"), true);
  assertEquals(ruleHandler("2021-13-25"), false);
});
