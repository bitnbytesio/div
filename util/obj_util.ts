export function getKeyValue(key: string) {
  return (obj: any) => obj[key];
}

export function namedArgs(params: Array<string>) {
  const obj = {};
  if (!Array.isArray(params)) {
    return obj;
  }

  params.forEach((i) => {
    const [k, v] = i.split("=");
    if (v && v.length) {
      // @ts-ignore
      obj[k.trim()] = v.trim() || null;
    }
  });

  return obj;
}

export function getValueByStringNotation(object: any, notation: string): string {
  const notationArr: Array<string> = notation.split('.');

  let value: any;

  notationArr.map((item) => {
    if (value === undefined) {
      value = object[item];
    } else {
      value = value[item];
    }
    return value;
  });

  return value;
}
