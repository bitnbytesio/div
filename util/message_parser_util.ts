import { camelCaseToSentance, snakeCaseToSentance } from "./str_util.ts";

interface MessageParserParams {
  message: string;
  attrName: string;
  ruleArgs?: any;
  ruleName: string;
  attrValue?: any;
}

export function messageParser(params: MessageParserParams) {
  const { message, attrName, ruleArgs, ruleName, attrValue } = params;

  let defaultMessage = message;

  // replace attribute name
  if (defaultMessage.indexOf(":attr") >= 0) {
    // convert camel to sentance and replce _ with space
    let attributeName = attrName || "";

    if (attributeName.indexOf(".") < 0) {
      attributeName = camelCaseToSentance(snakeCaseToSentance(attrName));
    }

    defaultMessage = defaultMessage.replace(":attr", attributeName);
  }

  // replace args
  if (defaultMessage.indexOf(":args") >= 0) {
    defaultMessage = defaultMessage.replace(":args", ruleArgs.toString());
  }

  // find and replace each arg
  for (let i = 0; i < 10; i++) {
    if (defaultMessage.indexOf(`:arg${i}`) >= 0) {
      defaultMessage = defaultMessage.replace(`:arg${i}`, ruleArgs[i]);
    } else {
      break;
    }
  }

  if (defaultMessage.indexOf(":value") >= 0) {
    /* istanbul ignore next */
    if (typeof attrValue === "object") {
      defaultMessage = defaultMessage.replace(
        ":value",
        JSON.stringify(attrValue),
      );
    } else if (typeof attrValue === "undefined") {
      defaultMessage = defaultMessage.replace(":value", "undefined");
    } else {
      defaultMessage = defaultMessage.replace(":value", attrValue.toString());
    }
  }

  return defaultMessage;
}
