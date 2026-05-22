import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import type { Attachment } from '../../types/attachment.types';
import { attachmentService } from '../../services/attachmentService';

interface PDFViewerProps {
  open: boolean;
  attachment: Attachment | null;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ open, attachment, onClose }) => {
  if (!attachment) return null;

  const pdfUrl = attachmentService.getDownloadUrl(attachment.id);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{attachment.originalFilename || attachment.filename}</DialogTitle>
      <DialogContent>
        <Box sx={{ height: '70vh', width: '100%' }}>
          <iframe
            src={pdfUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="PDF Viewer"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
        <Button
          variant="contained"
          onClick={() => window.open(pdfUrl, '_blank')}
        >
          Abrir em Nova Aba
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PDFViewer;