import { assertEquals } from "../test_deps.ts";

import { hex } from "../rules/hex_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:hex", function (): void {
  const ruleHandler = hex().handler;
  assertEquals(ruleHandler("6e6f646520696e7075742076616c696461746f72"), true);
  assertEquals(ruleHandler("Yes, Node is awesome"), false);
});
