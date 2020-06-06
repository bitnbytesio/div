import { assertEquals } from "../test_deps.ts";

import { minLength } from "../rules/min_length_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:minLength", function (): void {
  const ruleHandler = minLength(["minLength"]).handler;
  assertEquals(
    ruleHandler("uname", new ValidatorLite({ minLength: "4" })),
    true,
  );
  assertEquals(
    ruleHandler("uname", new ValidatorLite({ minLength: "10" })),
    false,
  );
});
