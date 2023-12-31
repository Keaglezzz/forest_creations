export default {
    name: 'orders',
    title: 'Orders',
    type: 'document',
    readOnly: true, // This will make the schema read-only
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'orderNumber',
        title: 'Order Number',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'shippingInfo',
        title: 'Shipping Info',
        type: 'object',
        fields: [
          {
            name: 'company',
            title: 'Company',
            type: 'string',
          },
          {
            name: 'address',
            title: 'Address',
            type: 'string',
          },
          {
            name: 'city',
            title: 'City',
            type: 'string',
          },
          {
            name: 'zip',
            title: 'Zip',
            type: 'string',
          },
          {
            name: 'contactNumber',
            title: 'Contact Number',
            type: 'string',
          },
        ],
      },
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'orderItem',
            fields: [
              {
                name: 'name',
                title: 'Name',
                type: 'string',
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
              },
              {
                name: 'volume',
                title: 'Volume',
                type: 'string',
              },
            ],
          },
        ],
      },
      {
        name: 'time',
        title: 'Time',
        type: 'datetime',
      },
    ],
  };
  