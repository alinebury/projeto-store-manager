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

  async getSaleId({ params }, res) {
    const { id } = params;
    await salesService.checkExists(id);
    const sale = await salesService.getSaleId(id);
    res.status(HTTP.OK).json(sale);
  },

  async deleteSale({ params: { id } }, res) {
    await salesService.checkExists(id);
    await salesService.deleteSale(id);
    res.status(HTTP.NO_CONTENT).json();
  },

  async editSale({ body, params: { id } }, res) {
    await salesService.checkExists(id);
    await Promise.all(body
      .map((item) => productsService.checkExists(item.productId)));
    const sale = await salesService.editSale(body, id);
    res.status(HTTP.OK).json(sale);
  },
};

module.exports = salesController;