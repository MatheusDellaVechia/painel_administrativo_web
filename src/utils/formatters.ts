import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ORDER_STATUS_LABELS, OrderStatus } from '../types/order.types';

export const formatDate = (dateString: string, formatStr: string = 'dd/MM/yyyy'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr, { locale: ptBR });
  } catch (error) {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, 'dd/MM/yyyy HH:mm');
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatOrderStatus = (status: OrderStatus): string => {
  return ORDER_STATUS_LABELS[status] || status;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
