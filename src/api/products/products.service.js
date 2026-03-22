/**
 * @import { BaseProduct, Product } from "./products.data.js"
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
   * @returns {Promise<readonly Product[]>}
   */
  async getAll() {
    const p = await this.dao.getAll();
    return p;
  }

  /**
   * @param {string} id
   * @returns {Promise<Product | undefined>}
   */
  async getById(id) {
    const p = await this.dao.getById(id);
    return p;
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

  /**
   * @param {string} id
   * @param {BaseProduct} data
   */
  async update(id, data) {
    await this.dao.save({ ...data, id });
    const p = await this.dao.getById(id);
    return p;
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await this.dao.delete(id);
  }
}

export default ProductsService;
