export interface Attachment {
  id: number;
  orderId: number;
  filename: string;
  originalFilename: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: {
    id: number;
    name: string;
  };
  uploadedAt: string;
  downloadUrl: string;
}

export interface FileUploadData {
  file: File;
  orderId: number;
}

export interface FileValidation {
  maxSize: number; // in bytes
  allowedTypes: string[];
}

export const FILE_VALIDATION: FileValidation = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
};
