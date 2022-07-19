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

  async getSales(req, res) {
    const sales = await salesService.getSales();
    res.status(HTTP.OK).json(sales);
  },

  async getSaleId(req, res) {
    const { id } = req.params;
    await salesService.checkExists(id);
    const sale = await salesService.getSaleId(id);
    res.status(HTTP.OK).json(sale);
  },
};

module.exports = salesController;