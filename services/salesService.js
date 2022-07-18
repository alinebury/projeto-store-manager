const salesModel = require('../models/salesModel');

const salesService = {
  async addSales(data) {
    const result = await salesModel.addSales(data);
    return result;
  },

};

module.exports = salesService;