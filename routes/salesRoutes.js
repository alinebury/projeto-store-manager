const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { validateBodyAddSales } = require('../middlewares/validateMiddleware');

const salesRouter = Router();

// add sales
salesRouter.post('/', validateBodyAddSales, salesController.addSales);

module.exports = salesRouter;