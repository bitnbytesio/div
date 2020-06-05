import { assertEquals } from "../test_deps.ts";
import { dateFormat } from "../rules/date_format_rule.ts";

Deno.test("rules:dateFormat", function (): void {
  const ruleHandler = dateFormat([]).handler;
  assertEquals(ruleHandler("2019-12-24"), true);
  assertEquals(ruleHandler("2021-13-25"), false);
});
