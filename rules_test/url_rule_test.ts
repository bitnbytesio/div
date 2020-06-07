import { assertEquals } from "../test_deps.ts";

import { url } from "../rules/url_rule.ts";

Deno.test("rules:url", function (): void {
  const ruleHandler = url().handler;
  assertEquals(ruleHandler("http://www.github.com"), true);
  assertEquals(ruleHandler("artisangang"), false);
});
