import { assertEquals } from "../test_deps.ts";

import { lte } from "../rules/lte_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:lte", function (): void {
  const ruleHandler = lte(["max"]).handler;
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 10 })), true);
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 4 })), false);
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 8 })), true);
});
