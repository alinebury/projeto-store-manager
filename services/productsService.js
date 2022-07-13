const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { runSchema, throwNotFoundError } = require('./utils');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

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
};

module.exports = productsService;
