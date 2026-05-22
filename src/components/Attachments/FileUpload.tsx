import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { FILE_VALIDATION } from '../../types/attachment.types';
import { formatFileSize } from '../../utils/formatters';

interface FileUploadProps {
  orderId: number;
  onUploadSuccess: () => void;
  onUploadStart?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ orderId, onUploadSuccess, onUploadStart }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > FILE_VALIDATION.maxSize) {
      return `Arquivo muito grande. Tamanho máximo: ${formatFileSize(FILE_VALIDATION.maxSize)}`;
    }

    if (!FILE_VALIDATION.allowedTypes.includes(file.type)) {
      return 'Tipo de arquivo não permitido. Use PDF, JPG ou PNG.';
    }

    return null;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      if (onUploadStart) {
        onUploadStart();
      }

      // Import the service here to avoid circular dependencies
      const { attachmentService } = await import('../../services/attachmentService');
      await attachmentService.uploadFile(orderId, file);
      
      onUploadSuccess();
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload do arquivo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept={FILE_VALIDATION.allowedTypes.join(',')}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={uploading}
      />
      
      <Paper
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: 'primary.main',
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <CircularProgress />
        ) : (
          <>
            <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Clique para selecionar arquivo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PDF, JPG ou PNG (máx. {formatFileSize(FILE_VALIDATION.maxSize)})
            </Typography>
          </>
        )}
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default FileUpload;