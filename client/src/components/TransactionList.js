import React from 'react';
import PropTypes from 'prop-types';
import Transaction from './Transaction';

function TransactionList(props) {
  const { transactions, actions } = props;
  let sameDay = transactions.length ? transactions[0].day : -1;
  let newDayStyle = {};

  return (
    <>
      {transactions.map((transaction) => {
        if (transaction.day !== sameDay) {
          newDayStyle = { marginTop: '10px', marginBottom: 0 };
          sameDay = transaction.day;
        } else {
          newDayStyle = { marginTop: '2px', marginBottom: 0 };
        }
        return (
          <Transaction
            key={transaction.id}
            data={transaction}
            actions={actions}
            style={newDayStyle}
          />
        );
      })}
    </>
  );
}

TransactionList.propTypes = {
  props: PropTypes.object,
  transactions: PropTypes.array,
};

export default TransactionList;
