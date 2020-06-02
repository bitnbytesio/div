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
