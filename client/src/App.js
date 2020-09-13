import React, { useEffect, useState } from 'react';
import MonthSelect from './components/MonthSelect';
import Summary from './components/Summary';
import NewTransaction from './components/NewTransaction';
import Filter from './components/Filter';
import TransactionList from './components/TransactionList';
import Loading from './components/Loading';
import {
  fetchPeriods,
  fetchTransactions,
  deleteTransaction,
} from './api/apiService';
import { padded2 } from './helpers/Formatter';

const styles = {
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  filter: {
    marginLeft: '5px',
  },
  NewTransactionButton: {
    width: '250px',
  },
};

export default function App() {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectError, setConnectError] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setConnectError('');
      try {
        const periodsFromAPI = await fetchPeriods();
        setPeriods(periodsFromAPI);
      } catch {
        setConnectError('Erro de conexão ao servidor de dados');
      } finally {
        setIsConnecting(false);
      }
    };
    fetchData();
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    setSelectedPeriod(`${now.getFullYear()}-${padded2(now.getMonth())}`);
  }, []);

  useEffect(() => {
    const fetchData = async (period) => {
      setIsLoading(true);
      setLoadError('');
      try {
        const transactionsFromAPI = await fetchTransactions(period);
        setMonthlyTransactions(transactionsFromAPI);
      } catch {
        setLoadError('Erro ao carregar os dados');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(selectedPeriod);
  }, [selectedPeriod]);

  function addTransaction(newTransaction) {
    const newTransactions = [...monthlyTransactions, newTransaction];
    const sortedTransactions = newTransactions.sort((a, b) => {
      return a.day - b.day;
    });
    setMonthlyTransactions(sortedTransactions);
  }

  useEffect(() => {
    const searchValue = filter.toLowerCase();

    const fTx = monthlyTransactions.filter(({ description }) => {
      if (searchValue === '') return true;
      return description.toLowerCase().includes(searchValue);
    });

    setFilteredTransactions(fTx);
  }, [monthlyTransactions, filter]);

  const handleSearch = (inputValue) => {
    inputValue ? setIsFiltering(true) : setIsFiltering(false);
    setFilter(inputValue);
  };

  const handleDeleteButtonClick = async (id) => {
    await deleteTransaction(id);
    const newTransactions = monthlyTransactions.filter((tx) => tx.id !== id);
    setMonthlyTransactions([...newTransactions]);
  };

  const handleEditSubmission = (edittedTransaction) => {
    const { id } = edittedTransaction;
    const newMonthlyTransactions = monthlyTransactions.map((tx) => {
      if (tx.id === id) {
        tx = { ...edittedTransaction };
      }
      return tx;
    });
    new setMonthlyTransactions([...newMonthlyTransactions]);
  };

  const actionsFunctions = {
    delete: handleDeleteButtonClick,
    edit: handleEditSubmission,
  };

  const renderPreConnect = () => {
    if (isConnecting) {
      return (
        <div className="center">
          <Loading />
        </div>
      );
    } else if (connectError) {
      return (
        <div className="center">
          <br /> <br /> <br />
          <p>{connectError}</p>
          <br /> <br /> <br />
        </div>
      );
    } else {
      return (
        <>
          <MonthSelect
            periods={periods}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
          {renderPostConnect()}
        </>
      );
    }
  };

  const renderPostConnect = () => {
    if (isLoading) {
      return (
        <div className="center">
          <Loading />
        </div>
      );
    } else if (loadError) {
      return (
        <div className="center">
          <br /> <br /> <br />
          <p>{loadError}</p>
          <br /> <br /> <br />
        </div>
      );
    } else {
      return (
        <>
          <Summary transactions={filteredTransactions} />
          <div className="input-field" style={styles.flexBetween}>
            <NewTransaction
              addTransaction={addTransaction}
              isFiltering={isFiltering}
              selectedPeriod={selectedPeriod}
              style={styles.NewTransactionButton}
            />
            <Filter
              filterString={filter}
              onSearch={handleSearch}
              style={styles.filter}
            />
          </div>
          <TransactionList
            actions={actionsFunctions}
            transactions={filteredTransactions}
          />
        </>
      );
    }
  };

  return (
    <div className="container" style={{ marginBottom: '20px' }}>
      <div className="center">
        <h3>Desafio Final do Bootcamp Full Stack</h3>
        <h5>Controle Financeiro Pessoal</h5>
      </div>
      {renderPreConnect()}
    </div>
  );
}
