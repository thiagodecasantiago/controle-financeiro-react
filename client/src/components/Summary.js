import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../helpers/Formatter';

const styles = {
  summaryDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid lightgrey',
    borderRadius: '5px',
    padding: '5px',
    margin: '10px 0',
  },
  positive: {
    color: 'green-text text-darken-2',
  },
  negative: {
    color: 'red-text text-lighten-2',
  },
};

function Summary(props) {
  const { transactions } = props;
  const [transactionsCount, setTransactionsCount] = useState(74);
  const [totalRevenues, setTotalRevenues] = useState(4000);
  const [totalExpenses, setTotalExpenses] = useState(1897);
  const [balance, setBalance] = useState();

  useEffect(() => {
    setTransactionsCount(transactions.length);
    let partialRevenues = 0,
      partialExpenses = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === '+') {
        partialRevenues += transaction.value;
      } else if (transaction.type === '-') {
        partialExpenses += transaction.value;
      }
    });
    setTotalRevenues(partialRevenues);
    setTotalExpenses(partialExpenses);
  }, [transactions]);

  useEffect(() => {
    setBalance(totalRevenues - totalExpenses);
  }, [totalRevenues, totalExpenses]);

  return (
    <div style={styles.summaryDiv}>
      <span>
        <strong>Lançamentos:</strong> {transactionsCount}
      </span>
      <span>
        <strong>Receitas:</strong>{' '}
        <span className={styles.positive.color}>
          {formatCurrency(totalRevenues)}
        </span>
      </span>
      <span>
        <strong>Despesas:</strong>{' '}
        <span className={styles.negative.color}>
          {formatCurrency(totalExpenses)}
        </span>
      </span>
      <span>
        <strong>Saldo:</strong>{' '}
        <span
          className={
            balance > 0 ? styles.positive.color : styles.negative.color
          }
        >
          {formatCurrency(balance)}
        </span>
      </span>
    </div>
  );
}

Summary.propTypes = {
  props: PropTypes.object,
  transactions: PropTypes.array,
};

export default Summary;
