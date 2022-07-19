const { StatusCodes: HTTP } = require('http-status-codes');
const productsService = require('../services/productsService');

const productsController = {
  async get(_req, res) {
    const products = await productsService.get();
    res.json(products);
  },

  async getId(req, res) {
    const { id } = req.params;
    await productsService.checkExists(id);
    const product = await productsService.getId(id);
    res.json(product);
  },

  async add({ body }, res) {
    const id = await productsService.add(body);
    res.status(HTTP.CREATED).json(id);
  },

  async edit({ body, params }, res) {
    const { id } = params;
    const { name } = body;
    await productsService.checkExists(id);
    await productsService.edit(name, id);
    res.status(HTTP.OK).json({ id, name });
  },

  async delete({ params: { id } }, res) {
    await productsService.checkExists(id);
    await productsService.delete(id);
    res.status(HTTP.NO_CONTENT).json();
  },
};

module.exports = productsController;