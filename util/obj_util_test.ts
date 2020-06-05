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

// console.log(getValuesByWildCardStringNotation(inputs));
