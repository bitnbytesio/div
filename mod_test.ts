import { assertEquals } from "./test_deps.ts";
import { Validator, rules } from "./mod.ts";

Deno.test(
  'shouldInitAndPassValidator',
  function (): void {
    const v = new Validator(
      { tandc: 'yes' },
      { tandc: [rules.accepted()] },
    );
    const passed = v.validate();
    assertEquals(passed, true);
  });
