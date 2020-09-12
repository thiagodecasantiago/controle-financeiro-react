import React from 'react';
import PropTypes from 'prop-types';

function TransactionForm(props) {
  const { type, description, category, value, yearMonthDay } = props.data;
  const { onChange, actionType } = props;
  const minValue = 0;
  const minDate = '2019-01-01';
  const maxDate = '2021-12-12';

  return (
    <form style={styles.form}>
      <div className="row">
        <label>
          <input
            type="radio"
            name="type"
            value="-"
            onChange={onChange}
            defaultChecked={type === '-'}
            disabled={actionType === 'edit'}
          />
          <span>Despesa</span>
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="+"
            onChange={onChange}
            defaultChecked={type === '+'}
            disabled={actionType === 'edit'}
          />
          <span>Receita</span>
        </label>
      </div>
      <div className="row">
        <div className="input-field">
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={description}
            onChange={onChange}
          />
          <label className="active" htmlFor="description">
            Descrição:
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field">
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={category}
            onChange={onChange}
          />
          <label className="active" htmlFor="category">
            Categoria:
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field">
          <input
            className="validate"
            type="Number"
            id="value"
            name="value"
            defaultValue={value}
            min={minValue}
            step="0.01"
            onChange={onChange}
          />
          <label className="active" htmlFor="value">
            Valor:
          </label>
        </div>
        <div className="input-field">
          <input
            type="date"
            name="yearMonthDay"
            defaultValue={yearMonthDay}
            min={minDate}
            max={maxDate}
            onChange={onChange}
          />
        </div>
      </div>
    </form>
  );
}

TransactionForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

const styles = {
  messageError: {
    fontWeight: 'bold',
    color: 'red',
    marginLeft: '5px',
  },
  form: {
    marginTop: '5px',
    marginBottom: '5px',
    padding: '10px',
    border: '1px solid lightgray',
    borderRadius: '3px',
  },
};

export default TransactionForm;
