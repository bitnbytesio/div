import { assertEquals } from "../test_deps.ts";

import { hash } from "../rules/hash_rule.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:hash", function (): void {
  const ruleHandler = hash(["md5"]).handler;
  assertEquals(ruleHandler("46f8fb7d635cb71beafe8fe580c56164"), true);
  assertEquals(ruleHandler("Yes, Node is awesome"), false);
});
