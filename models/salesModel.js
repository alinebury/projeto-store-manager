const db = require('./db');

const salesModel = {
  async addSales(data) {
    const insertSales = 'INSERT INTO StoreManager.sales (date) VALUES (now())';
    const [{ insertId }] = await db.query(insertSales);
    const values = data
      .map((item) => `(${insertId}, ${item.productId}, ${item.quantity})`).join(', ');
    const sql = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES ${values}`;
    await db.query(sql);
    return { id: insertId, itemsSold: data };
  },
};

module.exports = salesModel;