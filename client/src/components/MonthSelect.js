import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    width: '150px',
    margin: '0 20px',
  },
  button: {
    marginLeft: '5px',
    marginRight: '5px',
  },
};

function MonthSelect(props) {
  const { periods, selectedPeriod, setSelectedPeriod } = props;
  const [periodsOptions, setPeriodsOptions] = useState([]);
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);

  useEffect(() => {
    M.AutoInit();
  }, [periodsOptions, selectedPeriod]);

  useEffect(() => {
    const options = periods.map((period) => {
      let [periodYear, periodMonth] = period.split('-').map((s) => Number(s)); // "2019-11" => [2019, 11]
      const date = new Date(periodYear, periodMonth - 1);
      const monthString = date.toLocaleString('pt-BR', {
        month: 'short',
      });
      return {
        date,
        year: periodYear,
        month: periodMonth,
        value: period,
        name: `${monthString}/${periodYear}`,
      };
    });
    setPeriodsOptions(options);
  }, [periods]);

  useEffect(() => {
    const [periodYear, periodMonth] = selectedPeriod
      .split('-')
      .map((s) => Number(s));

    const curPeriodIndex = periodsOptions.findIndex((period) => {
      return period.year === periodYear && period.month === periodMonth;
    });
    setCurrentPeriodIndex(curPeriodIndex);
  }, [selectedPeriod, periodsOptions]);

  const handleChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const goPreviousMonth = () => {
    const previousPeriod = periodsOptions[currentPeriodIndex - 1];
    setSelectedPeriod(previousPeriod.value);
  };

  const goNextMonth = () => {
    const nextPeriod = periodsOptions[currentPeriodIndex + 1];
    setSelectedPeriod(nextPeriod.value);
  };

  useEffect(() => {
    if (currentPeriodIndex === 0) {
      setIsPrevBtnDisabled(true);
    } else {
      setIsPrevBtnDisabled(false);
    }
    if (currentPeriodIndex === periodsOptions.length - 1) {
      setIsNextBtnDisabled(true);
    } else {
      setIsNextBtnDisabled(false);
    }
  }, [currentPeriodIndex, periodsOptions.length]);

  return (
    <div style={styles.flexRow}>
      <button
        onClick={goPreviousMonth}
        disabled={isPrevBtnDisabled}
        className="waves-effect waves-light btn-small"
        style={styles.button}
      >
        {'<'}
      </button>
      <select
        value={selectedPeriod}
        onChange={handleChange}
        style={styles.select}
      >
        {periodsOptions.map((period) => {
          return (
            <option key={period.value} value={period.value}>
              {period.name}
            </option>
          );
        })}
      </select>
      <button
        onClick={goNextMonth}
        disabled={isNextBtnDisabled}
        className="waves-effect waves-light btn-small"
        style={styles.button}
      >
        {'>'}
      </button>
    </div>
  );
}

MonthSelect.propTypes = {
  periods: PropTypes.array.isRequired,
  selectedPeriod: PropTypes.string,
  setSelectedPeriod: PropTypes.func,
};

export default MonthSelect;
