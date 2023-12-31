export default {
  name: "woodSpecies",
  title: "Wood Species",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "The name of the wood species.",
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
      type: "number",
      description: "The price of this wood species.",
    },
    {
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
      description: "Additional details about this wood species.",
    },
  ],
};
