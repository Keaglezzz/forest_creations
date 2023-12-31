export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "position",
      title: "Position",
      type: "string",
      description:
        "Position of the about item (top-left, top-right, bottom, etc.)",
      options: {
        list: [
          { title: "Top Left", value: "top-left" },
          { title: "Top Right", value: "top-right" },
          { title: "Bottom", value: "bottom" },
        ],
      },
    },
    {
      name: "imgUrl",
      title: "ImgUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
