import apiClient from './api';
import type { Attachment } from '../types/attachment.types';

export const attachmentService = {
  async uploadFile(orderId: number, file: File): Promise<Attachment> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<Attachment>(
      `/api/orders/${orderId}/attachments`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async getOrderAttachments(orderId: number): Promise<Attachment[]> {
    const response = await apiClient.get<Attachment[]>(`/api/orders/${orderId}/attachments`);
    return response.data;
  },

  async deleteAttachment(id: number): Promise<void> {
    await apiClient.delete(`/api/attachments/${id}`);
  },

  getDownloadUrl(attachmentId: number): string {
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/attachments/${attachmentId}`;
  },
};
