// this is equivalent to index.js
// this will expose all public apis/methods
import * as Messages from "./messages/mod.ts";

import { getKeyValue } from "./util/obj_util.ts";

export * as Rules from "./rules/mod.ts";
export { Validator } from "./Validator.ts";
export { Messages };

const getMessageRef = (lang: string) => {
  let messages = getKeyValue(lang)(Messages);

  if (typeof messages === "undefined") {
    // @ts-ignore
    Messages[lang] = { messages: {} };

    messages = getKeyValue(lang)(Messages);
  }

  return messages;
};

export function extendMessages(newMessages: any, lang: string = "en") {
  const messages = getMessageRef(lang);

  Object.assign(messages, newMessages);
}

export function addCustomMessages(customMessages: any, lang: string = "en") {
  const messages = getMessageRef(lang);

  if (!messages.$custom) {
    messages.$custom = {};
  }

  Object.assign(messages.$custom, customMessages);
}

export function addNiceNames(attributesNiceNames: any, lang = "en") {
  const messages = getMessageRef(lang);

  if (!messages.$niceNames) {
    messages.$niceNames = {};
  }

  Object.assign(messages[lang].$niceNames, attributesNiceNames);
}

export function extend(ruleName: string, callback: Function) {
  // @ts-ignore
  Rules[ruleName] = callback;
}
