const properties = {
  id: { type: "string", nullable: false },
  imageUrl: { type: "string" },
  link: { type: "string" },
  sort: { type: "string" },
  isActive: { type: "boolean" },
  startAt: { type: "string" },
  endAt: { type: "string" },
};

export const bannerSchema = {
  type: "object",
  properties,
};

export const bannerInputSchema = {
  type: "object",
  required: ["imageUrl", "link", "sort", "isActive"],
  properties,
};

export const bannerUpdateSchema = {
  type: "object",
  required: ["imageUrl", "link", "sort"],
  properties,
};
