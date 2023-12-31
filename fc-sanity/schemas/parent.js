export default {
    name: 'parent',
    title: 'Parent',
    type: 'document',
    fields: [
      {
        name: 'parentCategory',
        title: 'Parent category',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'parentCategory',
          maxLength: 96,
        },
      },
      {
        name: 'productTypes',
        title: 'Product Types',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'productType' }],
          },
        ],
      },      
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        }
      },
    ],
  }
  