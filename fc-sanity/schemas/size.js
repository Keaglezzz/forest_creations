export default {
  name: "size",
  title: "Size",
  type: "document",
  fields: [
    {
      name: "size",
      title: "Size",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
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
      name: "price",
      title: "Price",
      type: "number", // Assuming the price is a numeric value
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
  ],
};
