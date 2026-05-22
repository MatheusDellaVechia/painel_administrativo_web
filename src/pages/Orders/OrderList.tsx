import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from '@mui/material';
import { orderService } from '../../services/orderService';
import { OrderStatus, ORDER_STATUS_LABELS } from '../../types/order.types';
import type { Order } from '../../types/order.types';
import { formatDateTime, formatCurrency, formatOrderStatus } from '../../utils/formatters';

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  
  // Filters
  const [customerName, setCustomerName] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrders({
        page: page + 1,
        limit: rowsPerPage,
        customerName: customerName || undefined,
        status: statusFilter || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      });
      setOrders(response.data);
      setTotal(response.pagination.total);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchOrders();
  };

  const handleClearFilters = () => {
    setCustomerName('');
    setStatusFilter('');
    setDateFrom('');
    setDateTo('');
    setPage(0);
    setTimeout(fetchOrders, 100);
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      [OrderStatus.AGUARDANDO_PAGAMENTO]: 'warning',
      [OrderStatus.PAGO]: 'success',
      [OrderStatus.CANCELADO]: 'error',
      [OrderStatus.EM_TRANSPORTE]: 'info',
      [OrderStatus.ENTREGUE]: 'success',
    };
    return colors[status];
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Pedidos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box component="form" onSubmit={handleFilterSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="Nome do Cliente"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {Object.values(OrderStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {ORDER_STATUS_LABELS[status]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                fullWidth
                label="Data Inicial"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                fullWidth
                label="Data Final"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Filtrar
                </Button>
                <Button onClick={handleClearFilters} variant="outlined" fullWidth>
                  Limpar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número do Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhum pedido encontrado
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={formatOrderStatus(order.status)}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{formatCurrency(order.total)}</TableCell>
                  <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Linhas por página:"
        />
      </TableContainer>
    </Container>
  );
};

export default OrderList;
