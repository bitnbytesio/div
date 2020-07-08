import { assertEquals } from "../test_deps.ts";

import { regex } from "../rules/regex_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:regex", function (): void {
  const ruleHandler = regex(["regex"]).handler;
  assertEquals(
    ruleHandler(
      "abc",
      new ValidatorLite({ regex: "[abc]" }),
    ),
    true,
  ),
    assertEquals(
      ruleHandler(
        "xyz",
        new ValidatorLite({ regex: "[abc]" }),
      ),
      false,
    );
});
