import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Modal from './Modal';
import { putTransaction } from '../api/apiService';

ReactModal.setAppElement('#root');

const styles = {
  button: {
    padding: '0 5px',
  },
};

function EditTransaction(props) {
  const { editTransaction } = props;
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async (currentTransaction) => {
    const fullTransactionData = {
      id: currentTransaction.id,
      type: currentTransaction.type,
      description: currentTransaction.description,
      category: currentTransaction.category,
      value: Number(currentTransaction.value),
      year: Number(currentTransaction.yearMonthDay.slice(0, 4)),
      month: Number(currentTransaction.yearMonthDay.slice(5, 7)),
      day: Number(currentTransaction.yearMonthDay.slice(8, 10)),
    };

    const transactionToAPI = await putTransaction(fullTransactionData);
    if (!transactionToAPI.error) {
      editTransaction(transactionToAPI);
      handleCloseModal();
    }
  };

  return (
    <>
      <button className="btn-flat" onClick={handleClick} style={styles.button}>
        <i className="material-icons">edit</i>
      </button>
      <ReactModal
        isOpen={showModal}
        contentLabel="Add Transaction"
        onRequestClose={handleCloseModal}
      >
        <Modal
          transaction={props.transaction}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          title="Edição de lançamento"
          actionType="edit"
        />
      </ReactModal>
    </>
  );
}

EditTransaction.propTypes = {
  props: PropTypes.object,
};

export default EditTransaction;
