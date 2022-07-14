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

  async add(req, res) {
    const data = await productsService.validateBodyAdd(req.body);
    const id = await productsService.add(data);
    res.status(201).json(id);
  },
};

module.exports = productsController;