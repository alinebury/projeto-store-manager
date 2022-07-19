const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { validateBodyAddSales } = require('../middlewares/validateMiddleware');

const salesRouter = Router();

// add sales
salesRouter.post('/', validateBodyAddSales, salesController.addSales);

// list sales id
salesRouter.get('/:id', salesController.getSaleId);

// list sales
salesRouter.get('/', salesController.getSales);

// delete sale
salesRouter.delete('/:id', salesController.deleteSale);

module.exports = salesRouter;