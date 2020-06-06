import { assertEquals } from "../test_deps.ts";

import { max } from "../rules/max_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:max", function (): void {
  const ruleHandler = max(["max"]).handler;
  assertEquals(ruleHandler("10", new ValidatorLite({ max: "20" })), true);
  assertEquals(ruleHandler(10, new ValidatorLite({ max: "20" })), true);
  assertEquals(ruleHandler("30", new ValidatorLite({ max: "20" })), false);
  assertEquals(
    ruleHandler("Harcharn Singh", new ValidatorLite({ max: "20" })),
    false,
  );
});
