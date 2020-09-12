import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TransactionForm from './TransactionForm';

function Modal(props) {
  const { transaction, onSubmit, onClose, title } = props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [currentTransaction, setCurrentTransaction] = useState(transaction);

  const handleChange = (event) => {
    setCurrentTransaction({
      ...currentTransaction,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(currentTransaction);
  };

  useEffect(() => {
    if (
      currentTransaction.description &&
      currentTransaction.category &&
      currentTransaction.yearMonthDay
    )
      setIsDisabled(false);
    else setIsDisabled(true);
  }, [
    currentTransaction.description,
    currentTransaction.category,
    currentTransaction.yearMonthDay,
  ]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h5>{title}</h5>
        <button className={'btn red'} style={{ flex: '0 0' }} onClick={onClose}>
          x
        </button>
      </div>
      <TransactionForm
        data={currentTransaction}
        onChange={handleChange}
        actionType={props.actionType}
      />
      <div className="row">
        <button
          className="btn waves-effect waves-green"
          disabled={isDisabled}
          type="submit"
          onClick={handleSubmit}
        >
          Salvar
        </button>
        {/* TODO <span style={styles.messageError}> {messageError}</span> */}
      </div>
    </div>
  );
}

Modal.propTypes = {
  transaction: PropTypes.object,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default Modal;
