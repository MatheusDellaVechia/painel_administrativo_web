import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import {
  ShoppingCart,
  AttachMoney,
  CheckCircle,
  HourglassEmpty,
  Cancel,
  LocalShipping,
} from '@mui/icons-material';
import { dashboardService } from '../services/dashboardService';
import type { DashboardStats } from '../types/api.types';
import { formatCurrency } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const statusCards = [
    {
      title: 'Aguardando Pagamento',
      value: stats?.ordersByStatus.AGUARDANDO_PAGAMENTO || 0,
      icon: <HourglassEmpty fontSize="large" />,
      color: '#ff9800',
    },
    {
      title: 'Pagos',
      value: stats?.ordersByStatus.PAGO || 0,
      icon: <AttachMoney fontSize="large" />,
      color: '#4caf50',
    },
    {
      title: 'Em Transporte',
      value: stats?.ordersByStatus.EM_TRANSPORTE || 0,
      icon: <LocalShipping fontSize="large" />,
      color: '#2196f3',
    },
    {
      title: 'Entregues',
      value: stats?.ordersByStatus.ENTREGUE || 0,
      icon: <CheckCircle fontSize="large" />,
      color: '#8bc34a',
    },
    {
      title: 'Cancelados',
      value: stats?.ordersByStatus.CANCELADO || 0,
      icon: <Cancel fontSize="large" />,
      color: '#f44336',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Visão geral dos pedidos
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingCart fontSize="large" sx={{ mr: 2, color: '#1976d2' }} />
                <Box>
                  <Typography variant="h4">{stats?.totalOrders || 0}</Typography>
                  <Typography color="text.secondary">Total de Pedidos</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoney fontSize="large" sx={{ mr: 2, color: '#4caf50' }} />
                <Box>
                  <Typography variant="h4">
                    {formatCurrency(stats?.totalRevenue || 0)}
                  </Typography>
                  <Typography color="text.secondary">Receita Total</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {statusCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ color: card.color, mr: 2 }}>{card.icon}</Box>
                  <Box>
                    <Typography variant="h5">{card.value}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
