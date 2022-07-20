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

  async getSales() {
    const sql = `
    SELECT
        sales_products.sale_id AS saleId,
        sales_products.product_id AS productId,
        sales_products.quantity AS quantity,
        sales.date AS date
    FROM
      StoreManager.sales_products AS sales_products
    INNER JOIN
      StoreManager.sales AS sales ON sales.id = sales_products.sale_id
    ORDER BY sales_products.sale_id, sales_products.product_id;`;

    const [item] = await db.query(sql);
    return item;
  },

  async checkExists(id) {
    const sql = `SELECT * FROM StoreManager.sales WHERE id = ${id}`;
    const [[item]] = await db.query(sql);
    return !!item;
  },

  async getSaleId(id) {
    const sql = `
    SELECT
      sp.product_id AS productId,
      sp.quantity AS quantity,
      s.date AS date
    FROM
      StoreManager.sales_products AS sp
    INNER JOIN
      StoreManager.sales AS s ON s.id = sp.sale_id
    WHERE sp.sale_id = ${id}
    ORDER BY sp.sale_id, sp.product_id`;

    const [item] = await db.query(sql);
    return item;
  },

  async deleteSale(id) {
    const sql = `DELETE FROM StoreManager.sales WHERE id = ${id}`;
    await db.query(sql);
  },

  async editSale(data, id) {
    const values = data
      .map((item) => `WHEN product_id = ${item.productId} THEN ${item.quantity}`).join(' ');
    const sql = `UPDATE StoreManager.sales_products
    SET quantity = CASE
      ${values}
    END
    WHERE sale_id = ${id};`;
    await db.query(sql);
    return { saleId: id, itemsUpdated: data };
  },
};

module.exports = salesModel;