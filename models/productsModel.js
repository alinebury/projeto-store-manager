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

  async add({ name }) {
    const sql = `INSERT INTO StoreManager.products (name) VALUES ("${name}")`;
    const [{ insertId }] = await db.query(sql);
    return { id: insertId, name };
  },

  async edit(data, id) {
    const sql = `UPDATE StoreManager.products SET name = "${data}" WHERE id = ${id}`;
    await db.query(sql);
  },

  async delete(id) {
    const sql = `DELETE FROM StoreManager.products WHERE id = ${id}`;
    await db.query(sql);
  },

  async search(q) {
    const sql = `SELECT * FROM StoreManager.products WHERE name LIKE '${q}%'`;
    const [item] = await db.query(sql);
    console.log(item);
    return item;
  },
};

module.exports = productModel;
