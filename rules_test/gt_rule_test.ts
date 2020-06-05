import { assertEquals } from "../test_deps.ts";

import { gt } from "../rules/gt_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:gt", function (): void {
  const ruleHandler = gt([]).handler;
  assertEquals(ruleHandler(4,{max:5}), true);
  assertEquals(ruleHandler(3,{max:1}), false);
});
