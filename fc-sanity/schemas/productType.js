export default {
  name: "productType",
  title: "Product Type",
  type: "document",
  fields: [
    {
      name: "productType",
      title: "Product Type",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "productType",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};
