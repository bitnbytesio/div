import { assertEquals } from "../test_deps.ts";

import { different } from "../rules/different_rule.ts";

Deno.test("rules:different", function (): void {
  const ruleHandler = different(["new_password"]).handler;
  assertEquals(ruleHandler("000000", { new_password: "123456" }), true);
  assertEquals(ruleHandler("000000", { new_password: "000000" }), false);
});
