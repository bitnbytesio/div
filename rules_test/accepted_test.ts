import { assertEquals } from "../test_deps.ts";

import { accepted } from "../rules/accepted.ts";

Deno.test("rules:accepted", function (): void {
  const acceptedHandler = accepted().handler;
  assertEquals(acceptedHandler("yes"), true);
  assertEquals(acceptedHandler("no"), false);
});
