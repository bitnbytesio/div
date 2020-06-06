import { assertEquals } from "../test_deps.ts";

import { min } from "../rules/min_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:min", function (): void {
  const ruleHandler = min(["min"]).handler;
  assertEquals(ruleHandler("10", new ValidatorLite({ min: "8" })), true);
  assertEquals(ruleHandler(10, new ValidatorLite({ min: "8" })), true);
  assertEquals(ruleHandler("30", new ValidatorLite({ min: "40" })), false);
  assertEquals(
    ruleHandler("Harcharn Singh", new ValidatorLite({ min: "20" })),
    false,
  );
});
