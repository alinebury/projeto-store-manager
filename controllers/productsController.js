const productsService = require('../services/productsService');

const productsController = {
  async get(_req, res) {
    const products = await productsService.get();
    res.json(products);
  },

  async getId(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.checkExists(id);
    const product = await productsService.getId(id);
    res.json(product);
  },
};

module.exports = productsController;