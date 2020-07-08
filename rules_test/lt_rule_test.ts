import { assertEquals } from "../test_deps.ts";

import { lt } from "../rules/lt_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:lt", function (): void {
  const ruleHandler = lt(["max"]).handler;
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 10 })), true);
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 4 })), false);
});
