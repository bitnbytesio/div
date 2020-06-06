import { assertEquals } from "../test_deps.ts";

import { maxLength } from "../rules/max_length_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:maxLength", function (): void {
  const ruleHandler = maxLength(["maxLength"]).handler;
  assertEquals(
    ruleHandler("uname", new ValidatorLite({ maxLength: "10" })),
    true,
  );
  assertEquals(
    ruleHandler("uname", new ValidatorLite({ maxLength: "4" })),
    false,
  );
});
