/**
 * @import DbWrapper from "../../DbWrapper.js"
 * @import { Product } from "./products.data.js"
 */
const tableName = "products";

/**
 * @param {any} r
 * @returns {Product}
 */
function rowExtractor(r) {
  return {
    id: r.id,
    name: r.name,
    description: r.description,
    price: r.price,
    category: r.category,
    inStock: !!r.inStock,
  };
}

class ProductsDao {
  /**
   * @param {DbWrapper} db
   */
  constructor(db) {
    /** @readonly @type {DbWrapper} */
    this.db = db;
  }

  /**
   * @returns {Promise<readonly Product[]>}
   */
  async getAll() {
    return this.db.transaction(() => {
      const query = this.db.prepare(/* sql */ `
        SELECT id, name, description, price, category, inStock FROM ${tableName}
        ;`);
      return query.all().map(rowExtractor);
    })();
  }

  /**
   * @param {string} id
   */
  async getById(id) {
    return this.db.transaction(() => {
      const query = this.db.prepare(/* sql */ `
        SELECT id, name, description, price, category, inStock FROM ${tableName}
          WHERE id = ?
        ;`);
      const row = query.get(id);
      return row ? rowExtractor(row) : undefined;
    })();
  }

  /**
   * @param {Product} product
   */
  async save(product) {
    this.db.transaction(() => {
      this.db
        .prepare(
          /* sql */ `
          INSERT INTO ${tableName} (id, name, description, price, category, inStock)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT (id) DO UPDATE SET
              id = excluded.id,
              name = excluded.name,
              description = excluded.description,
              price = excluded.price,
              category = excluded.category,
              inStock = excluded.inStock
          ;`,
        )
        .run(
          product.id,
          product.name,
          product.description,
          product.price,
          product.category,
          product.inStock ? 1 : 0,
        );
    })();
  }
}

export default ProductsDao;
