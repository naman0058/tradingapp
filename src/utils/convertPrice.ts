import { appSelector } from 'reduxs/reducers/app-reducer';
import { useAppSelector } from 'reduxs/store';
import { CurrencyEnumType } from 'types/redux-types';

interface ConverPriceProps {
  num: number;
  maxDigits?: number;
}

const convertPrice = ({ num, maxDigits = 2 }: ConverPriceProps) => {
  const _currency = useAppSelector(appSelector).currency;

  switch (_currency) {
    case CurrencyEnumType.USD:
      return Number(num).toLocaleString('en-GE', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: maxDigits ? maxDigits : 0,
      });
    case CurrencyEnumType.ARS:
      return Number(num).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: maxDigits ? maxDigits : 0,
      });
    case CurrencyEnumType.INR:
      return Number(num).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: maxDigits ? maxDigits : 0,
      });
    case CurrencyEnumType.VND:
      return Number(num).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    case CurrencyEnumType.GBP:
      return Number(num).toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: maxDigits ? maxDigits : 0,
      });
    default:
      return Number(num).toLocaleString('en-GE', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: maxDigits ? maxDigits : 0,
      });
  }
};

export default convertPrice;
