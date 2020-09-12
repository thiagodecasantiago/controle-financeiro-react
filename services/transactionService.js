import mongoose from 'mongoose';

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
import TransactionModel from '../models/TransactionModel.js';

const padded = (number) => number.toString().padStart(2, '0');

const retrieveTransactions = async (req, res) => {
  const { period } = req.query;
  if (!period) {
    res.send({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm.',
    });
    return;
  }

  const condition = period ? { yearMonth: period } : {};

  try {
    const results = await TransactionModel.find(condition).sort({ day: 1 });
    res.send(results);
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message || 'Erro ao listar as transações.' });
  }
};

const createTransaction = async (req, res) => {
  const { description, value, category, year, month, day, type } = req.body;
  const doc = new TransactionModel({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth: `${year}-${padded(month)}`,
    yearMonthDay: `${year}-${padded(month)}-${padded(day)}`,
    type,
  });

  try {
    const transaction = await TransactionModel.create(doc);
    res.status(201).send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar.' });
  }
};

const updateTransaction = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualização vazios',
    });
  }

  const id = req.params.id;

  const { description, value, category, year, month, day } = req.body;
  const newDoc = {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth: `${year}-${padded(month)}`,
    yearMonthDay: `${year}-${padded(month)}-${padded(day)}`,
  };

  try {
    const transaction = await TransactionModel.findByIdAndUpdate(id, newDoc, {
      new: true,
    });
    if (!transaction) throw Error();
    res.send(transaction);
  } catch (error) {
    res.status(500).send({
      message: 'Erro ao atualizar a transaction id: ' + id,
      trueError: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    await TransactionModel.findByIdAndDelete(id);
    res.send({ message: 'Transaction removida com sucesso.' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar a transaction id: ' + id });
  }
};

const retrievePeriods = async (_, res) => {
  try {
    const results = await TransactionModel.distinct('yearMonth');
    res.send(results);
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message || 'Erro ao listar os períodos.' });
  }
};

export default {
  retrieveTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  retrievePeriods,
};
