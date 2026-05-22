import type { User } from '../types/user.types';
import { UserRole } from '../types/user.types';
import type { Order, StatusHistory } from '../types/order.types';
import { OrderStatus } from '../types/order.types';
import type { Attachment } from '../types/attachment.types';
import type { DashboardStats } from '../types/api.types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@ecommerce.com',
    name: 'Administrador Sistema',
    phone: '+55 11 98888-7777',
    role: UserRole.ADMIN,
    isActive: true,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 2,
    email: 'gerente@ecommerce.com',
    name: 'Maria Gerente',
    phone: '+55 11 97777-6666',
    role: UserRole.MANAGER,
    isActive: true,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 3,
    email: 'joao@example.com',
    name: 'João Silva',
    phone: '+55 11 96666-5555',
    role: UserRole.REGULAR_USER,
    isActive: false,
    createdAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 4,
    email: 'maria@example.com',
    name: 'Maria Santos',
    phone: '+55 11 95555-4444',
    role: UserRole.VIEWER,
    isActive: true,
    createdAt: '2026-05-12T10:00:00Z',
    updatedAt: '2026-05-12T10:00:00Z',
  },
  {
    id: 5,
    email: 'pedro@example.com',
    name: 'Pedro Costa',
    phone: '+55 11 94444-3333',
    role: null,
    isActive: false,
    createdAt: '2026-05-18T15:30:00Z',
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-2026-00001',
    customer: {
      id: 101,
      name: 'Carlos Oliveira',
      email: 'carlos@example.com',
      phone: '+55 11 99999-8888',
    },
    items: [
      {
        id: 1,
        productName: 'Notebook Dell Inspiron 15',
        quantity: 1,
        unitPrice: 3500.00,
        subtotal: 3500.00,
      },
      {
        id: 2,
        productName: 'Mouse Logitech MX Master',
        quantity: 1,
        unitPrice: 350.00,
        subtotal: 350.00,
      },
    ],
    status: OrderStatus.ENTREGUE,
    total: 3850.00,
    createdAt: '2026-04-15T10:30:00Z',
    updatedAt: '2026-04-25T14:20:00Z',
  },
  {
    id: 2,
    orderNumber: 'ORD-2026-00002',
    customer: {
      id: 102,
      name: 'Ana Paula Santos',
      email: 'ana@example.com',
      phone: '+55 21 98888-7777',
    },
    items: [
      {
        id: 3,
        productName: 'iPhone 15 Pro 256GB',
        quantity: 1,
        unitPrice: 7500.00,
        subtotal: 7500.00,
      },
    ],
    status: OrderStatus.EM_TRANSPORTE,
    total: 7500.00,
    createdAt: '2026-05-10T14:20:00Z',
    updatedAt: '2026-05-17T09:15:00Z',
  },
  {
    id: 3,
    orderNumber: 'ORD-2026-00003',
    customer: {
      id: 103,
      name: 'Roberto Lima',
      email: 'roberto@example.com',
    },
    items: [
      {
        id: 4,
        productName: 'Smart TV Samsung 55"',
        quantity: 1,
        unitPrice: 2800.00,
        subtotal: 2800.00,
      },
      {
        id: 5,
        productName: 'Soundbar JBL',
        quantity: 1,
        unitPrice: 1200.00,
        subtotal: 1200.00,
      },
    ],
    status: OrderStatus.PAGO,
    total: 4000.00,
    createdAt: '2026-05-15T16:45:00Z',
    updatedAt: '2026-05-16T10:30:00Z',
  },
  {
    id: 4,
    orderNumber: 'ORD-2026-00004',
    customer: {
      id: 104,
      name: 'Juliana Ferreira',
      email: 'juliana@example.com',
      phone: '+55 31 97777-6666',
    },
    items: [
      {
        id: 6,
        productName: 'Cadeira Gamer DXRacer',
        quantity: 1,
        unitPrice: 1800.00,
        subtotal: 1800.00,
      },
    ],
    status: OrderStatus.AGUARDANDO_PAGAMENTO,
    total: 1800.00,
    createdAt: '2026-05-18T11:20:00Z',
    updatedAt: '2026-05-18T11:20:00Z',
  },
  {
    id: 5,
    orderNumber: 'ORD-2026-00005',
    customer: {
      id: 105,
      name: 'Fernando Alves',
      email: 'fernando@example.com',
    },
    items: [
      {
        id: 7,
        productName: 'PlayStation 5',
        quantity: 1,
        unitPrice: 4200.00,
        subtotal: 4200.00,
      },
      {
        id: 8,
        productName: 'Controle DualSense Extra',
        quantity: 2,
        unitPrice: 450.00,
        subtotal: 900.00,
      },
    ],
    status: OrderStatus.CANCELADO,
    total: 5100.00,
    createdAt: '2026-05-12T09:00:00Z',
    updatedAt: '2026-05-13T15:45:00Z',
  },
  {
    id: 6,
    orderNumber: 'ORD-2026-00006',
    customer: {
      id: 106,
      name: 'Beatriz Costa',
      email: 'beatriz@example.com',
      phone: '+55 41 96666-5555',
    },
    items: [
      {
        id: 9,
        productName: 'MacBook Air M3',
        quantity: 1,
        unitPrice: 9500.00,
        subtotal: 9500.00,
      },
    ],
    status: OrderStatus.PAGO,
    total: 9500.00,
    createdAt: '2026-05-17T13:30:00Z',
    updatedAt: '2026-05-18T08:00:00Z',
  },
];

// Mock Status History
export const mockStatusHistory: Record<number, StatusHistory[]> = {
  1: [
    {
      id: 1,
      orderId: 1,
      status: OrderStatus.AGUARDANDO_PAGAMENTO,
      changedBy: { id: 1, name: 'Sistema' },
      changedAt: '2026-04-15T10:30:00Z',
    },
    {
      id: 2,
      orderId: 1,
      status: OrderStatus.PAGO,
      notes: 'Pagamento aprovado via cartão de crédito',
      changedBy: { id: 1, name: 'Administrador Sistema' },
      changedAt: '2026-04-15T11:00:00Z',
    },
    {
      id: 3,
      orderId: 1,
      status: OrderStatus.EM_TRANSPORTE,
      notes: 'Enviado via Correios - Rastreio: BR123456789BR',
      changedBy: { id: 2, name: 'Maria Gerente' },
      changedAt: '2026-04-18T14:20:00Z',
    },
    {
      id: 4,
      orderId: 1,
      status: OrderStatus.ENTREGUE,
      notes: 'Entregue e assinado pelo cliente',
      changedBy: { id: 2, name: 'Maria Gerente' },
      changedAt: '2026-04-25T14:20:00Z',
    },
  ],
  2: [
    {
      id: 5,
      orderId: 2,
      status: OrderStatus.AGUARDANDO_PAGAMENTO,
      changedBy: { id: 1, name: 'Sistema' },
      changedAt: '2026-05-10T14:20:00Z',
    },
    {
      id: 6,
      orderId: 2,
      status: OrderStatus.PAGO,
      notes: 'Pagamento via PIX confirmado',
      changedBy: { id: 1, name: 'Administrador Sistema' },
      changedAt: '2026-05-10T15:00:00Z',
    },
    {
      id: 7,
      orderId: 2,
      status: OrderStatus.EM_TRANSPORTE,
      notes: 'Enviado via Transportadora Rápida - NF: 12345',
      changedBy: { id: 1, name: 'Administrador Sistema' },
      changedAt: '2026-05-17T09:15:00Z',
    },
  ],
  3: [
    {
      id: 8,
      orderId: 3,
      status: OrderStatus.AGUARDANDO_PAGAMENTO,
      changedBy: { id: 1, name: 'Sistema' },
      changedAt: '2026-05-15T16:45:00Z',
    },
    {
      id: 9,
      orderId: 3,
      status: OrderStatus.PAGO,
      notes: 'Pagamento em 3x no cartão confirmado',
      changedBy: { id: 2, name: 'Maria Gerente' },
      changedAt: '2026-05-16T10:30:00Z',
    },
  ],
  4: [
    {
      id: 10,
      orderId: 4,
      status: OrderStatus.AGUARDANDO_PAGAMENTO,
      changedBy: { id: 1, name: 'Sistema' },
      changedAt: '2026-05-18T11:20:00Z',
    },
  ],
  5: [
    {
      id: 11,
      orderId: 5,
      status: OrderStatus.AGUARDANDO_PAGAMENTO,
      changedBy: { id: 1, name: 'Sistema' },
      changedAt: '2026-05-12T09:00:00Z',
    },
    {
      id: 12,
      orderId: 5,
      status: OrderStatus.CANCELADO,
      notes: 'Cancelado a pedido do cliente - estorno em processamento',
      changedBy: { id: 2, name: 'Maria Gerente' },
      changedAt: '2026-05-13T15:45:00Z',
    },
  ],
  6: [
    {
      id: 13,
      orderId: 6,
      status: OrderStatus.AGUARDANDO_PAGAMENTO,
      changedBy: { id: 1, name: 'Sistema' },
      changedAt: '2026-05-17T13:30:00Z',
    },
    {
      id: 14,
      orderId: 6,
      status: OrderStatus.PAGO,
      notes: 'Boleto pago',
      changedBy: { id: 1, name: 'Administrador Sistema' },
      changedAt: '2026-05-18T08:00:00Z',
    },
  ],
};

// Mock Attachments
export const mockAttachments: Record<number, Attachment[]> = {
  1: [
    {
      id: 1,
      orderId: 1,
      filename: 'nota_fiscal_pedido_001.pdf',
      originalFilename: 'NF-12345.pdf',
      fileSize: 245678,
      mimeType: 'application/pdf',
      uploadedBy: { id: 2, name: 'Maria Gerente' },
      uploadedAt: '2026-04-18T14:25:00Z',
      downloadUrl: '/api/attachments/1',
    },
    {
      id: 2,
      orderId: 1,
      filename: 'comprovante_entrega.jpg',
      originalFilename: 'Comprovante.jpg',
      fileSize: 156789,
      mimeType: 'image/jpeg',
      uploadedBy: { id: 2, name: 'Maria Gerente' },
      uploadedAt: '2026-04-25T14:25:00Z',
      downloadUrl: '/api/attachments/2',
    },
  ],
  2: [
    {
      id: 3,
      orderId: 2,
      filename: 'nota_fiscal_pedido_002.pdf',
      originalFilename: 'NF-12346.pdf',
      fileSize: 198234,
      mimeType: 'application/pdf',
      uploadedBy: { id: 1, name: 'Administrador Sistema' },
      uploadedAt: '2026-05-17T09:20:00Z',
      downloadUrl: '/api/attachments/3',
    },
  ],
  3: [],
  4: [],
  5: [],
  6: [],
};

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  ordersByStatus: {
    AGUARDANDO_PAGAMENTO: 1,
    PAGO: 2,
    CANCELADO: 1,
    EM_TRANSPORTE: 1,
    ENTREGUE: 1,
  },
  totalOrders: 6,
  totalRevenue: 31750.00,
};

// Storage for dynamic data
let users = [...mockUsers];
let orders = [...mockOrders];
let statusHistory = { ...mockStatusHistory };
let attachments = { ...mockAttachments };
let stats = { ...mockDashboardStats };

// Helper to update stats
const updateStats = () => {
  const statusCounts: Record<string, number> = {
    AGUARDANDO_PAGAMENTO: 0,
    PAGO: 0,
    CANCELADO: 0,
    EM_TRANSPORTE: 0,
    ENTREGUE: 0,
  };
  
  let total = 0;
  let revenue = 0;
  
  orders.forEach(order => {
    statusCounts[order.status]++;
    total++;
    if (order.status !== OrderStatus.CANCELADO) {
      revenue += order.total;
    }
  });
  
  stats = {
    ordersByStatus: statusCounts,
    totalOrders: total,
    totalRevenue: revenue,
  };
};

// Mock API Functions
export const mockApi = {
  // Auth
  login: (email: string, _password: string) => {
    // Mock: aceita qualquer senha para facilitar testes
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }
    if (!user.isActive) {
      throw new Error('Sua conta está inativa. Aguarde a ativação por um administrador.');
    }
    return {
      token: `mock-jwt-token-${user.id}`,
      user,
    };
  },

  register: (data: { email: string; password: string; name: string; phone?: string }) => {
    const exists = users.find(u => u.email === data.email);
    if (exists) {
      throw new Error('Email já cadastrado');
    }
    
    const newUser: User = {
      id: users.length + 1,
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: null,
      isActive: false,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    return newUser;
  },

  getCurrentUser: (token: string) => {
    const userId = parseInt(token.split('-').pop() || '0');
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  },

  // Users
  getUsers: (filters: { page: number; limit: number; isActive?: boolean; search?: string }) => {
    let filtered = [...users];
    
    if (filters.isActive !== undefined) {
      filtered = filtered.filter(u => u.isActive === filters.isActive);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(search) || 
        u.email.toLowerCase().includes(search)
      );
    }
    
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    
    return {
      data: filtered.slice(start, end),
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / filters.limit),
      },
    };
  },

  activateUser: (id: number, isActive: boolean) => {
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    user.isActive = isActive;
    user.updatedAt = new Date().toISOString();
    return user;
  },

  updateUserRole: (id: number, role: typeof UserRole[keyof typeof UserRole]) => {
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    user.role = role;
    user.updatedAt = new Date().toISOString();
    return user;
  },

  // Dashboard
  getDashboardStats: () => {
    updateStats();
    return stats;
  },

  // Orders
  getOrders: (filters: any) => {
    let filtered = [...orders];
    
    if (filters.status) {
      filtered = filtered.filter(o => o.status === filters.status);
    }
    
    if (filters.customerName) {
      const search = filters.customerName.toLowerCase();
      filtered = filtered.filter(o => 
        o.customer.name.toLowerCase().includes(search)
      );
    }
    
    if (filters.dateFrom) {
      filtered = filtered.filter(o => o.createdAt >= filters.dateFrom);
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(o => o.createdAt <= filters.dateTo);
    }
    
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      data: filtered.slice(start, end),
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      },
    };
  },

  getOrderById: (id: number) => {
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    return order;
  },

  updateOrderStatus: (id: number, data: { status: typeof OrderStatus[keyof typeof OrderStatus]; notes?: string }) => {
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    
    order.status = data.status;
    order.updatedAt = new Date().toISOString();
    
    // Add to history
    const history = statusHistory[id] || [];
    history.push({
      id: Object.keys(statusHistory).length + 1,
      orderId: id,
      status: data.status,
      notes: data.notes,
      changedBy: { id: 1, name: 'Usuário Atual' },
      changedAt: new Date().toISOString(),
    });
    statusHistory[id] = history;
    
    // Simulate email notification
    console.log(`📧 Email enviado para ${order.customer.email}: Pedido ${order.orderNumber} atualizado para ${data.status}`);
    
    updateStats();
    return order;
  },

  getOrderHistory: (id: number) => {
    return statusHistory[id] || [];
  },

  // Attachments
  uploadFile: (orderId: number, file: File) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    
    const orderAttachments = attachments[orderId] || [];
    const newAttachment: Attachment = {
      id: Object.values(attachments).flat().length + 1,
      orderId,
      filename: file.name,
      originalFilename: file.name,
      fileSize: file.size,
      mimeType: file.type,
      uploadedBy: { id: 1, name: 'Usuário Atual' },
      uploadedAt: new Date().toISOString(),
      downloadUrl: `/api/attachments/${Object.values(attachments).flat().length + 1}`,
    };
    
    orderAttachments.push(newAttachment);
    attachments[orderId] = orderAttachments;
    
    return newAttachment;
  },

  getOrderAttachments: (orderId: number) => {
    return attachments[orderId] || [];
  },
};
