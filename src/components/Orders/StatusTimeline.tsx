import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { Typography, Paper, Chip } from '@mui/material';
import {
  CheckCircle,
  Cancel,
  LocalShipping,
  AttachMoney,
  HourglassEmpty,
} from '@mui/icons-material';
import { OrderStatus } from '../../types/order.types';
import type { StatusHistory } from '../../types/order.types';
import { formatDateTime, formatOrderStatus } from '../../utils/formatters';

interface StatusTimelineProps {
  history: StatusHistory[];
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ history }) => {
  const getStatusIcon = (status: OrderStatus) => {
    const icons = {
      [OrderStatus.AGUARDANDO_PAGAMENTO]: <HourglassEmpty />,
      [OrderStatus.PAGO]: <AttachMoney />,
      [OrderStatus.EM_TRANSPORTE]: <LocalShipping />,
      [OrderStatus.ENTREGUE]: <CheckCircle />,
      [OrderStatus.CANCELADO]: <Cancel />,
    };
    return icons[status];
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, 'primary' | 'error' | 'warning' | 'success' | 'info'> = {
      [OrderStatus.AGUARDANDO_PAGAMENTO]: 'warning',
      [OrderStatus.PAGO]: 'success',
      [OrderStatus.EM_TRANSPORTE]: 'info',
      [OrderStatus.ENTREGUE]: 'success',
      [OrderStatus.CANCELADO]: 'error',
    };
    return colors[status];
  };

  if (history.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Nenhum histórico disponível
      </Typography>
    );
  }

  return (
    <Timeline position="right">
      {history.map((item, index) => (
        <TimelineItem key={item.id}>
          <TimelineOppositeContent color="text.secondary">
            <Typography variant="caption" sx={{ display: 'block' }}>{formatDateTime(item.changedAt)}</Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              por {item.changedBy.name}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={getStatusColor(item.status)}>
              {getStatusIcon(item.status)}
            </TimelineDot>
            {index < history.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Chip
                label={formatOrderStatus(item.status)}
                color={getStatusColor(item.status)}
                size="small"
                sx={{ mb: 1 }}
              />
              {item.notes && (
                <Typography variant="body2" color="text.secondary">
                  {item.notes}
                </Typography>
              )}
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default StatusTimeline;