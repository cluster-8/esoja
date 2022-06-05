/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
export function formatCurrency(value: number) {
  try {
    let tmp = `${value.toFixed(2)}`;
    const isNegativeValue = tmp.indexOf('-') != -1;
    tmp = tmp.replace(/\D/g, '');
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    if (isNegativeValue && tmp) tmp = `-${tmp}`;
    return tmp ? `R$ ${tmp}` : isNegativeValue ? 'R$ -' : '';
  } catch (e) {
    return 'R$ 0,00';
  }
}
