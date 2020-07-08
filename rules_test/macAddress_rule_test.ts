import { assertEquals } from "../test_deps.ts";

import { macAddress } from "../rules/macAddress.ts";
import { ValidatorLite } from "../mock/validator_lite_mock.ts";

Deno.test("rules:macAddress", function (): void {
  const ruleHandler = macAddress().handler;
  assertEquals(ruleHandler("00:14:22:01:23:45"), true);
  assertEquals(ruleHandler("Yes, Node is awesome"), false);
});
