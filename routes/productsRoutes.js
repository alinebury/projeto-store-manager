const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

// list product id
productsRouter.get('/:id', productsController.getId);

// list products
productsRouter.get('/', productsController.get);

// add products
productsRouter.post('/', productsController.add);

module.exports = productsRouter;