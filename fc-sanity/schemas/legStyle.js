export default {
  name: "legStyle",
  title: "Leg Styles",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "The name of the leg style.",
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
      description: "The price for this leg style.",
    },
    {
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
      description: "Additional details about this leg style.",
    },
  ],
};
