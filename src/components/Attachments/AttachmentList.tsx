import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  PictureAsPdf,
  Image,
  Description,
  Download,
  Visibility,
  Delete,
} from '@mui/icons-material';
import type { Attachment } from '../../types/attachment.types';
import { formatFileSize, formatDateTime } from '../../utils/formatters';
import { attachmentService } from '../../services/attachmentService';

interface AttachmentListProps {
  attachments: Attachment[];
  onDelete?: (id: number) => void;
  onView?: (attachment: Attachment) => void;
}

const AttachmentList: React.FC<AttachmentListProps> = ({
  attachments,
  onDelete,
  onView,
}) => {
  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/pdf') {
      return <PictureAsPdf color="error" />;
    } else if (mimeType.startsWith('image/')) {
      return <Image color="primary" />;
    }
    return <Description />;
  };

  const handleDownload = (attachment: Attachment) => {
    const url = attachmentService.getDownloadUrl(attachment.id);
    window.open(url, '_blank');
  };

  if (attachments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Nenhum anexo
      </Typography>
    );
  }

  return (
    <List>
      {attachments.map((attachment) => (
        <ListItem
          key={attachment.id}
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            mb: 1,
          }}
        >
          <ListItemIcon>{getFileIcon(attachment.mimeType)}</ListItemIcon>
          <ListItemText
            primary={attachment.originalFilename || attachment.filename}
            secondary={
              <Box>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  {formatFileSize(attachment.fileSize)} • Enviado por {attachment.uploadedBy.name}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  {formatDateTime(attachment.uploadedAt)}
                </Typography>
              </Box>
            }
          />
          <ListItemSecondaryAction>
            {attachment.mimeType === 'application/pdf' && onView && (
              <IconButton
                edge="end"
                onClick={() => onView(attachment)}
                title="Visualizar"
                sx={{ mr: 1 }}
              >
                <Visibility />
              </IconButton>
            )}
            <IconButton
              edge="end"
              onClick={() => handleDownload(attachment)}
              title="Baixar"
              sx={{ mr: 1 }}
            >
              <Download />
            </IconButton>
            {onDelete && (
              <IconButton
                edge="end"
                onClick={() => onDelete(attachment.id)}
                title="Excluir"
                color="error"
              >
                <Delete />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default AttachmentList;