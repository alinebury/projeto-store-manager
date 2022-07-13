const db = require('./db');

const productModel = {
  async get() {
    const sql = 'SELECT * FROM StoreManager.products;';
    const [item] = await db.query(sql);
    return item;
  },

  async getId(id) {
    const sql = `SELECT * FROM StoreManager.products WHERE id = ${id}`;
    const [[item]] = await db.query(sql);
    return item;
  },

  async exists(id) {
    const sql = `SELECT * FROM StoreManager.products WHERE id = ${id}`;
    const [[item]] = await db.query(sql);
    return !!item;
  },
};

module.exports = productModel;