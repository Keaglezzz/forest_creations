export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "parent" }],
    },
    {
      name: "subCategory",
      title: "Sub Category",
      type: "reference",
      to: [{ type: "productType" }],
    },
    {
      name: "size",
      title: "Size",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "size" }],
        },
      ],
    },
    {
      name: "woodSpecies",
      title: "Wood Species",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "woodSpecies" }],
        },
      ],
    },
    {
      name: "stain",
      title: "Stain",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "stain" }],
        },
      ],
    },
    {
      name: "legStyle",
      title: "Leg Style",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "legStyle" }],
        },
      ],
    },
    {
      name: "legMaterial",
      title: "Leg Material",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "legMaterial" }],
        },
      ],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "stock",
      title: "Stock",
      type: "number",
    },
  ],
};
