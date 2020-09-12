import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Modal from './Modal';
import { postTransaction } from '../api/apiService';

const newTransactionInitialValue = (selectedPeriod) => ({
  type: '-',
  description: '',
  category: '',
  value: 0,
  yearMonthDay: selectedPeriod.concat('-01'),
});

ReactModal.setAppElement('#root');
ReactModal.defaultStyles.overlay.zIndex = '1';

function NewTransaction(props) {
  const { addTransaction } = props;
  const [showModal, setShowModal] = useState(false);
  // let initValue = {...newTransactionInitialValue,
  //   yearMonthDay: props.selectedPeriod.concat('-01')};

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async (currentTransaction) => {
    const fullTransactionData = {
      type: currentTransaction.type,
      description: currentTransaction.description,
      category: currentTransaction.category,
      value: Number(currentTransaction.value),
      year: Number(currentTransaction.yearMonthDay.slice(0, 4)),
      month: Number(currentTransaction.yearMonthDay.slice(5, 7)),
      day: Number(currentTransaction.yearMonthDay.slice(8, 10)),
    };
    const transactionToAPI = await postTransaction(fullTransactionData);
    if (!transactionToAPI.error) {
      addTransaction(transactionToAPI);
      handleCloseModal();
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={handleClick}
        disabled={props.isFiltering}
        style={props.style}
      >
        + Novo Lançamento
      </button>
      <ReactModal
        isOpen={showModal}
        contentLabel="Add Transaction"
        onRequestClose={handleCloseModal}
        style={{ zIndex: 2 }}
      >
        <Modal
          transaction={newTransactionInitialValue(props.selectedPeriod)}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          title="Inclusão de Lançamento"
          actionType="create"
        />
      </ReactModal>
    </>
  );
}

NewTransaction.propTypes = {
  props: PropTypes.object,
  addTransaction: PropTypes.func,
  isFiltering: PropTypes.bool,
};

export default NewTransaction;
