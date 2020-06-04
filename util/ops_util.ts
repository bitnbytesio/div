import { validator } from "../deps.ts";

export function reallyEmpty(value: any): boolean {
  return validator.isEmpty(
    (value === undefined || value === null ? "" : value) + "",
    { ignore_whitespace: false },
  );
}
