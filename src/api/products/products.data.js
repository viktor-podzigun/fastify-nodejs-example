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
