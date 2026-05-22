import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';
import { orderService } from '../../services/orderService';
import { attachmentService } from '../../services/attachmentService';
import type { Order, StatusHistory, UpdateOrderStatusData } from '../../types/order.types';
import type { Attachment } from '../../types/attachment.types';
import { formatDateTime, formatCurrency, formatOrderStatus } from '../../utils/formatters';
import StatusUpdateDialog from '../../components/Orders/StatusUpdateDialog';
import StatusTimeline from '../../components/Orders/StatusTimeline';
import FileUpload from '../../components/Attachments/FileUpload';
import AttachmentList from '../../components/Attachments/AttachmentList';
import PDFViewer from '../../components/Attachments/PDFViewer';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dialogs
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<Attachment | null>(null);

  const fetchOrderData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const [orderData, historyData, attachmentsData] = await Promise.all([
        orderService.getOrderById(parseInt(id)),
        orderService.getOrderHistory(parseInt(id)),
        attachmentService.getOrderAttachments(parseInt(id)),
      ]);
      
      setOrder(orderData);
      setHistory(historyData);
      setAttachments(attachmentsData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar pedido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [id]);

  const handleStatusUpdate = async (data: UpdateOrderStatusData) => {
    if (!order) return;
    
    await orderService.updateOrderStatus(order.id, data);
    await fetchOrderData();
  };

  const handleFileUploadSuccess = () => {
    fetchOrderData();
  };

  const handleViewPdf = (attachment: Attachment) => {
    setSelectedPdf(attachment);
    setPdfViewerOpen(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Container>
        <Alert severity="error">{error || 'Pedido não encontrado'}</Alert>
        <Button onClick={() => navigate('/orders')} sx={{ mt: 2 }}>
          Voltar para listagem
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/orders')}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">
            Pedido {order.orderNumber}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setStatusDialogOpen(true)}
          >
            Atualizar Status
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Order Information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informações do Pedido
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={formatOrderStatus(order.status)}
                  color="primary"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total
                </Typography>
                <Typography variant="h6">{formatCurrency(order.total)}</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Criado em
                </Typography>
                <Typography>{formatDateTime(order.createdAt)}</Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Última atualização
                </Typography>
                <Typography>{formatDateTime(order.updatedAt)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informações do Cliente
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Nome
                </Typography>
                <Typography>{order.customer.name}</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography>{order.customer.email}</Typography>
              </Box>
              
              {order.customer.phone && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Telefone
                  </Typography>
                  <Typography>{order.customer.phone}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Items */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Itens do Pedido
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell align="right">Preço Unitário</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell align="right">{formatCurrency(item.subtotal)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Typography variant="h6">Total:</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">{formatCurrency(order.total)}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Attachments */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Anexos
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FileUpload
              orderId={order.id}
              onUploadSuccess={handleFileUploadSuccess}
            />
            
            <Box sx={{ mt: 2 }}>
              <AttachmentList
                attachments={attachments}
                onView={handleViewPdf}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Status History */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Histórico de Status
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <StatusTimeline history={history} />
          </Paper>
        </Grid>
      </Grid>

      {/* Status Update Dialog */}
      <StatusUpdateDialog
        open={statusDialogOpen}
        currentStatus={order.status}
        onClose={() => setStatusDialogOpen(false)}
        onUpdate={handleStatusUpdate}
      />

      {/* PDF Viewer */}
      <PDFViewer
        open={pdfViewerOpen}
        attachment={selectedPdf}
        onClose={() => {
          setPdfViewerOpen(false);
          setSelectedPdf(null);
        }}
      />
    </Container>
  );
};

export default OrderDetail;
