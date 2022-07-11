const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

// list product id
productsRouter.get('/:id', productsController.getId);

// list products
productsRouter.get('/', productsController.get);

module.exports = productsRouter;