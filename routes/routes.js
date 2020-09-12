import express from 'express';
const transactionRouter = express.Router();
import transactionService from '../services/transactionService.js';

transactionRouter.post('/', transactionService.createTransaction);
transactionRouter.get('/', transactionService.retrieveTransactions);
transactionRouter.put('/:id', transactionService.updateTransaction);
transactionRouter.delete('/:id', transactionService.deleteTransaction);
transactionRouter.get('/periods', transactionService.retrievePeriods);

export default transactionRouter;
