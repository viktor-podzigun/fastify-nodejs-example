/**
 * @typedef {{
 *  readonly name: string;
 *  readonly description: string;
 *  readonly price: number;
 *  readonly category: string;
 *  readonly inStock: boolean;
 * }} BaseProduct
 */

/**
 * @typedef {BaseProduct & {
 *  readonly id: string;
 * }} Product
 */

//see: https://json-schema.org/
export const paramsSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern:
        //30df5493-5079-4d6e-966a-9af60a9b45ba
        "^(?i:[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})$",
    },
  },
};

export const postSchema = {
  type: "object",
  required: ["name", "description", "price", "category", "inStock"],
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number", minimum: 1 },
    category: { type: "string" },
    inStock: { type: "boolean" },
  },
};

export const getSchema = {
  type: "object",
  required: ["id", "name", "description", "price", "category", "inStock"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number", minimum: 1 },
    category: { type: "string" },
    inStock: { type: "boolean" },
  },
};

export const errorSchema = {
  type: "object",
  required: ["error"],
  properties: {
    error: { type: "string" },
  },
};
