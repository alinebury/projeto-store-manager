const { StatusCodes: HTTP } = require('http-status-codes');
const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const salesController = {
  async addSales({ body }, res) {
    await Promise.all(body
      .map((item) => productsService.checkExists(item.productId)));
    const result = await salesService.addSales(body);
    res.status(HTTP.CREATED).json(result);
  },
};

module.exports = salesController;