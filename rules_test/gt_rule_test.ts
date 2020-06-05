import { assertEquals } from "../test_deps.ts";

import { gt } from "../rules/gt_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:gt", function (): void {
  const ruleHandler = gt(['max']).handler;
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 5 })), true);
  assertEquals(ruleHandler(8, new ValidatorLite({ max: 9 })), false);
});
