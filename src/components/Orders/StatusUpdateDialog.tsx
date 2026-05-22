import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
} from '@mui/material';
import type { UpdateOrderStatusData } from '../../types/order.types';
import { ORDER_STATUS_LABELS, OrderStatus } from '../../types/order.types';

interface StatusUpdateDialogProps {
  open: boolean;
  currentStatus: OrderStatus;
  onClose: () => void;
  onUpdate: (data: UpdateOrderStatusData) => Promise<void>;
}

const StatusUpdateDialog: React.FC<StatusUpdateDialogProps> = ({
  open,
  currentStatus,
  onClose,
  onUpdate,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedStatus === currentStatus && !notes) {
      setError('Selecione um novo status ou adicione observações');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onUpdate({ status: selectedStatus, notes: notes || undefined });
      onClose();
      setNotes('');
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Atualizar Status do Pedido</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Novo Status</InputLabel>
          <Select
            value={selectedStatus}
            label="Novo Status"
            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
          >
            {Object.values(OrderStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {ORDER_STATUS_LABELS[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Observações (opcional)"
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ mt: 2 }}
          placeholder="Ex: Código de rastreio, motivo do cancelamento, etc."
        />

        {selectedStatus === OrderStatus.EM_TRANSPORTE && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Ao marcar como "Em Transporte", é recomendado anexar a nota fiscal.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateDialog;