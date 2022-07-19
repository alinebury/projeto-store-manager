const salesModel = require('../models/salesModel');
const { throwNotFoundError } = require('../middlewares/utils');

const salesService = {
  async addSales(data) {
    const result = await salesModel.addSales(data);
    return result;
  },

  async getSales() {
    const sales = await salesModel.getSales();
    return sales;
  },

  async checkExists(id) {
    const exists = await salesModel.checkExists(id);
    if (!exists) throwNotFoundError('Sale not found');
  },

  async getSaleId(id) {
    const sale = await salesModel.getSaleId(id);
    return sale;
  },

  async deleteSale(id) {
    await salesModel.deleteSale(id);
  },
};

module.exports = salesService;