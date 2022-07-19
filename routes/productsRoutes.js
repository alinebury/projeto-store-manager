const { Router } = require('express');
const productsController = require('../controllers/productsController');
const { validateBody, validateParamsId } = require('../middlewares/validateMiddleware');

const productsRouter = Router();

// search products
productsRouter.get('/search', productsController.search);

// list product id
productsRouter.get('/:id', validateParamsId, productsController.getId);

// list products
productsRouter.get('/', productsController.get);

// add products
productsRouter.post('/', validateBody, productsController.add);

// edit products
productsRouter.put('/:id', validateBody, productsController.edit);

// delete products
productsRouter.delete('/:id', productsController.delete);

module.exports = productsRouter;