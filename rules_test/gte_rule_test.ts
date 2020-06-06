import { assertEquals } from "../test_deps.ts";

import { gte } from "../rules/gte_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:gte", function (): void {
  const ruleHandler = gte(["max"]).handler;
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 5 })), true);
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 9 })), false);
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 8 })), true);
});
