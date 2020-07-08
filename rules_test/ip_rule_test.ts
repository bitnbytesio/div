import { assertEquals } from "../test_deps.ts";

import { ip } from "../rules/ip_rule.ts";

Deno.test("rules:ip", function (): void {
  const ruleHandler = ip().handler;
  assertEquals(ruleHandler("192.168.1.14"), true);
  assertEquals(ruleHandler("Yes, Node is awesome"), false);
});
