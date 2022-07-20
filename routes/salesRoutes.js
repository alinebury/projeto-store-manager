const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { validateBodySales } = require('../middlewares/validateMiddleware');

const salesRouter = Router();

// add sales
salesRouter.post('/', validateBodySales, salesController.addSales);

// list sales id
salesRouter.get('/:id', salesController.getSaleId);

// list sales
salesRouter.get('/', salesController.getSales);

// delete sale
salesRouter.delete('/:id', salesController.deleteSale);

// put sale
salesRouter.put('/:id', validateBodySales, salesController.editSale);

module.exports = salesRouter;