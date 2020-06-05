import { assertEquals } from "../test_deps.ts";

import { domain } from "../rules/domain_rule.ts";

Deno.test("rules:domain", function (): void {
  const ruleHandler = domain().handler;
  assertEquals(ruleHandler("example.com"), true);
  assertEquals(ruleHandler("www.example.com"), true);
  assertEquals(ruleHandler("http://www.example.com"), false);
  assertEquals(ruleHandler("localhost"), false);
});
