export default {
  name: "legMaterial",
  title: "Leg Materials",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "The name of the leg material.",
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
      description: "The price for this leg material.",
    },
    {
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
      description: "Additional details about this leg material.",
    },
  ],
};
