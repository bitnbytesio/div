const input = {
  event: {
    name: 'event name',
  },
  users: [
    {
      name: 'test',
      contacts: [{
        code: 13,
      },
      ],
    },
    {
      name: 'rest',
      contacts: [{
        code: 14,
        contactPerson: {
          name: 'Contact Person',
        }
      },
      ],
    },
  ],
};

const inputs = [input];

function getValueByStringNotation(object: any, notation: string): string {
  const notationArr: Array<string> = notation.split('.');

  if (notationArr.length === 1) {
    return object[notation];
  }

  let value: any;

  let deepNotation: boolean = false;

  notationArr.forEach((item) => {
    // if (item === '*') {
    //   deepNotation = true;
    //   return;
    // }

    // if (deepNotation === true) {
    //   if (!Array.isArray(value)) {
    //     return;
    //   }
    //   let arr: any = [];
    //   value.forEach((deepObject) => {
    //     const deepObjectValue = getValueByStringNotation(deepObject, item);
    //     console.log(deepObjectValue);
    //     if (Array.isArray(deepObjectValue)) {
    //       arr.push(...deepObjectValue);
    //     } else {
    //       // console.log(deepObjectValue);
    //       arr.push(deepObjectValue);
    //     }
    //   });
    //   value = arr;
    //   deepNotation = false;
    //   return;
    // }

    // console.log('what ge got', value);
    if (value === undefined) {
      value = object[item];
    } else {
      value = value[item];
    }
    return value;
  });

  return value;
}


let value;


// value = getValueByStringNotation(input, 'event.name');
// console.log(value);

// value = getValueByStringNotation(input, 'users.*.name');
// console.log(value);

// value = getValueByStringNotation(input, 'users.*.contacts.*.code');
// console.log(value);

// value = getValueByStringNotation(input, 'users');
// console.log(value);
const isIterable = (object: any) =>
  object != null && typeof object === 'object' || Array.isArray(object)

interface NotationLoopOptions {
  prefix?: Array<any>;
  iterations?: number;
  matchKeys?: Array<string>;
  seperator?: string;
}

function getValuesByWildCardStringNotation(iterable: any, options: NotationLoopOptions = {}) {
  const { prefix, iterations, seperator } = Object.assign(
    { prefix: [], iterations: 10000, seperator: '.' },
    options,
  );

  const notationsVals: any = {};
  const notationMap: any = {};

  let iterationsCount = 1;

  const parse = (data: any, prefix: Array<any>) => {
    iterationsCount++;

    if (iterationsCount > iterations) {
      // eslint-disable-next-line no-console
      throw new Error(`Max(${iterations}) repetation was reached.`);
    }


    Object.keys(data).forEach((key: any, index: number) => {
      const v = data[key];
      if (isIterable(v)) {
        parse(v, [...prefix, key]);
      } else {
        const notationKey = `${prefix.join(seperator)}.${key}`;
        notationsVals[notationKey] = v;
        const notationMapKey = notationKey.replace(/\.[0-9+]\./g, '.*.').replace(/^[0-9+]\./g, '*.');
        notationMap[notationMapKey] = notationMap[notationMapKey] || [];
        notationMap[notationMapKey].push(notationKey);
      }
    });
  };

  parse(iterable, [...prefix]);

  return { notationsVals, notationMap };
}

const inp = {
  user: {
    address: {
      contacts: {
        phone: 'Test',
      }
    }
  }
};

Object.keys(inp).forEach((k: any) => {
  // @ts-ignore
  const data: any = inp[k];
  console.log(getValuesByWildCardStringNotation(data, { prefix: [k] }));
})
