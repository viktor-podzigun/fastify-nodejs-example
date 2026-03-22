/**
 * @import { BaseProduct } from "./products.data.js"
 */
import crypto from "node:crypto";
import ProductsDao from "./products.dao.js";

class ProductsService {
  /**
   * @param {ProductsDao} dao
   */
  constructor(dao) {
    /** @readonly @type {ProductsDao} */
    this.dao = dao;
  }

  /**
   * @param {BaseProduct} data
   */
  async create(data) {
    const id = crypto.randomUUID();
    await this.dao.save({ ...data, id });
    const p = await this.dao.getById(id);
    return p;
  }
}

export default ProductsService;
