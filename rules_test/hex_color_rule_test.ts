import { assertEquals } from "../test_deps.ts";

import { hexColor } from "../rules/hex_color_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:hexColor", function (): void {
  const ruleHandler = hexColor().handler;
  assertEquals(ruleHandler("#FFFFFF"), true);
  assertEquals(ruleHandler("#000"), true);
  assertEquals(ruleHandler("f00"), true);
  assertEquals(ruleHandler("Yes, Node is awesome"), false);
});
