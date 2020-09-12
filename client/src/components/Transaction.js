import React from 'react';
import PropTypes from 'prop-types';
import EditTransaction from './EditTransaction';
import { padded2, formatCurrency } from '../helpers/Formatter';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    // margin: '3px',
    borderRadius: '3px',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '3px',
    marginBottom: '3px',
  },
  button: {
    padding: '0 5px',
  },
  code: {
    fontFamily: '"Fira Code Retina", Consolas, monospace, Arial',
  },
  marginLR: {
    // marginLeft: '5px',
    // marginRight: '5px',
  },
};

function Transaction(props) {
  const { description, value, category, day, type, id } = props.data;
  const { actions, style } = props;
  const color = type === '+' ? 'green darken-2' : 'red lighten-2';

  const handleDelete = () => {
    actions.delete(id);
  };

  return (
    <div style={{ ...style, ...styles.root }} className={`${color} row`}>
      <div style={{ ...styles.code, ...styles.marginLR }} className="col s1">
        {padded2(day)}
      </div>
      <div
        style={{ ...styles.flexColumn, ...styles.marginLR }}
        className="col s7"
      >
        <span>
          <strong>{category}</strong>
        </span>
        <span>{description}</span>
      </div>
      <span style={{ ...styles.code, ...styles.marginLR }} className="col s2">
        {formatCurrency(value)}
      </span>
      <div className="col s2">
        <EditTransaction
          transaction={props.data}
          editTransaction={actions.edit}
        />
        <button
          className="btn-flat"
          onClick={handleDelete}
          style={{ ...styles.button, ...styles.marginLR }}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  );
}

Transaction.propTypes = {
  props: PropTypes.object,
  description: PropTypes.string,
  value: PropTypes.number,
  category: PropTypes.string,
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  yearMonth: PropTypes.string,
  yearMonthDay: PropTypes.string,
  type: PropTypes.string,
};

export default Transaction;
