export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        readOnly: true,  // This makes the 'name' field uneditable
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        readOnly: true,  // This makes the 'email' field uneditable
      },
      {
        name: 'lastLogin',
        title: 'Last Login',
        type: 'string',
        readOnly: true,  // This makes the 'lastLogin' field uneditable
      },
      // Other fields as necessary...
    ]
  }
  