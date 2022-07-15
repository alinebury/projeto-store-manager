const { Router } = require('express');
const productsController = require('../controllers/productsController');
const { validateBodyAdd, validateParamsId } = require('../middlewares/validateMiddleware');

const productsRouter = Router();

// list product id
productsRouter.get('/:id', validateParamsId, productsController.getId);

// list products
productsRouter.get('/', productsController.get);

// add products
productsRouter.post('/', validateBodyAdd, productsController.add);

module.exports = productsRouter;