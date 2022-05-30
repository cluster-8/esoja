import { QuotationResponse } from '../../hooks/useHome';
import { api } from './api';

export const getQuotation = async () => {
  try {
    const { data } = await api.get<QuotationResponse[]>(`/imea/dashboard`);
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message || err.response.data.message[0]);
  }
};
