export default {
  name: "stain",
  title: "Stains & Finishes",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "The name of the stain or finish.",
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
      description: "The price of this stain or finish.",
    },
    {
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
      description: "Additional details about this stain or finish.",
    },
  ],
};
