import { assertEquals } from "../test_deps.ts";

import { arrayUnique } from "../rules/array_unique_rule.ts";

Deno.test("rules:arrayUnique", function (): void {
  const ruleHandler = arrayUnique({}).handler;
  assertEquals(ruleHandler([]), true);
  assertEquals(ruleHandler({}), false);
  assertEquals(ruleHandler(1), false);
  assertEquals(ruleHandler("Test"), false);
  assertEquals(ruleHandler(true), false);

  assertEquals(ruleHandler([1, 2, 3]), true);
  assertEquals(ruleHandler(["a", "b", "c"]), true);

  assertEquals(ruleHandler([1, 2, 3, 1]), false);
  assertEquals(ruleHandler(["a", "b", "c", "a", "d"]), false);
});
