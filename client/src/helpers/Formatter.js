const LOCALE = 'pt-br';
// const LOCALE_EN = 'en-us';

function formatNumberWithSeparators(number) {
  return Intl.NumberFormat(LOCALE, { useGrouping: true }).format(number);
  // return number.toLocaleString(LOCALE);
}
function formatPercent(number) {
  return Intl.NumberFormat(LOCALE, {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(number);
}
function formatCurrency(money) {
  return Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(money);
}
function formatCurrencyWithSignal(money) {
  const formattedCurrency = formatCurrency(money);
  return money > 0 ? `+${formattedCurrency}` : formattedCurrency;
}

const padded2 = (number) => number.toString().padStart(2, '0');

export {
  formatNumberWithSeparators,
  formatCurrency,
  formatPercent,
  formatCurrencyWithSignal,
  padded2,
};
