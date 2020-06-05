import { assertEquals } from "../test_deps.ts";

import { same } from "../rules/same_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:same", function (): void {
  const ruleHandler = same(["confirmPassword"]).handler;
  assertEquals(
    ruleHandler("123456", new ValidatorLite({ confirmPassword: "123456" })),
    true,
  );
  assertEquals(
    ruleHandler("123456", new ValidatorLite({ confirmPassword: "123123" })),
    false,
  );
});
