import axios from 'axios';

// 'api' is relative path that links to back-end thanks to 'proxy' in package.json
const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transaction';

export async function fetchPeriods() {
  try {
    const periods = await api.get(`${RESOURCE}/periods`);
    if (periods.data.error) throw new Error(periods.data.error);
    return periods.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTransactions(period) {
  try {
    const transactions = await api.get(`${RESOURCE}?period=${period}`);
    if (transactions.data.error) throw new Error(transactions.data.error);

    const sortedTransactions = transactions.data.sort((a, b) => {
      return a.day - b.day;
    });
    return sortedTransactions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteTransaction(id) {
  try {
    await api.delete(`${RESOURCE}/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export async function postTransaction(transactionData) {
  try {
    const { data } = await api.post(RESOURCE, transactionData);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function putTransaction(transactionData) {
  try {
    const { data } = await api.put(
      `${RESOURCE}/${transactionData.id}`,
      transactionData
    );
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
