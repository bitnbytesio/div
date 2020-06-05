import { assertEquals } from "../test_deps.ts";

import { getValuesByWildCardStringNotation } from "./obj_util.ts";

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
const inp = {
  user: {
    address: {
      contacts: {
        phone: 'Test',
      }
    }
  }
};

const inpf = {
  name: "username",
  email: "user@example.com",
}

Deno.test('util:obj:getValuesByWildCardStringNotation array as top level', function (): void {
  const { notationsVals, notationMap } = getValuesByWildCardStringNotation(inputs);
  assertEquals(notationsVals, {
    '0.event.name': "event name",

    '0.users.0.name': "test",
    '0.users.1.name': "rest",

    '0.users.0.contacts.0.code': 13,

    '0.users.1.contacts.0.code': 14,
    '0.users.1.contacts.0.contactPerson.name': 'Contact Person',
  });

  assertEquals(notationMap, {
    '*.event.name': ["0.event.name"],

    '*.users.*.name': ["0.users.0.name", "0.users.1.name"],

    '*.users.*.contacts.*.code': ["0.users.0.contacts.0.code", "0.users.1.contacts.0.code"],
    "*.users.*.contacts.*.contactPerson.name": ["0.users.1.contacts.0.contactPerson.name"],
  });
})
