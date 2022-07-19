const productsModel = require('../models/productsModel');
const { throwNotFoundError } = require('../middlewares/utils');

const productsService = {
  async get() {
    const products = await productsModel.get();
    return products;
  },

  async getId(id) {
    const product = await productsModel.getId(id);
    return product;
  },

  async checkExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) throwNotFoundError('Product not found');
  },

  async add(data) {
    const id = await productsModel.add(data);
    return id;
  },
};

module.exports = productsService;
