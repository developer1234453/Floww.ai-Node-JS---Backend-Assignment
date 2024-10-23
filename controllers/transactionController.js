const Transaction = require('../models/transactionModel');


exports.addTransaction = async (req, res) => {
  try {
   
    const { type, category, amount, description } = req.body;

   
    if (!type || !category || !amount) {
      return res.status(400).json({ message: 'Please provide type, category, and amount' });
    }

   
    const transaction = new Transaction({ type, category, amount, description });
    
   
    await transaction.save();

    
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add transaction', error: error.message });
  }
};


exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get transactions', error: error.message });
  }
};


exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get transaction', error: error.message });
  }
};


exports.updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update transaction', error: error.message });
  }
};


exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
  }
};


exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();

   
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

   
    const balance = income - expense;

   
    res.status(200).json({ income, expense, balance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get summary', error: error.message });
  }
};
