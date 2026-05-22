import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Switch,
  Chip,
  IconButton,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { userService } from '../../services/userService';
import { UserRole } from '../../types/user.types';
import type { User } from '../../types/user.types';
import { formatDateTime } from '../../utils/formatters';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState<string>('all');
  
  // Role dialog
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers({
        page: page + 1,
        limit: rowsPerPage,
        search: search || undefined,
        isActive: filterActive === 'all' ? undefined : filterActive === 'active',
      });
      setUsers(response.data);
      setTotal(response.pagination.total);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, filterActive]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchUsers();
  };

  const handleActivateToggle = async (user: User) => {
    try {
      await userService.activateUser(user.id, !user.isActive);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar usuário');
    }
  };

  const handleOpenRoleDialog = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setRoleDialogOpen(true);
  };

  const handleCloseRoleDialog = () => {
    setRoleDialogOpen(false);
    setSelectedUser(null);
    setSelectedRole(null);
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !selectedRole) return;
    
    try {
      await userService.updateUserRole(selectedUser.id, { role: selectedRole });
      handleCloseRoleDialog();
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar função');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Usuários
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Buscar por nome ou email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterActive}
              label="Status"
              onChange={(e) => setFilterActive(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="active">Ativos</MenuItem>
              <MenuItem value="inactive">Inativos</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Buscar
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Função</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role ? (
                      <Chip label={user.role} size="small" color="primary" />
                    ) : (
                      <Chip label="Sem função" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.isActive}
                      onChange={() => handleActivateToggle(user)}
                      color="primary"
                    />
                    {user.isActive ? 'Ativo' : 'Inativo'}
                  </TableCell>
                  <TableCell>{formatDateTime(user.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenRoleDialog(user)}
                      title="Alterar função"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Linhas por página:"
        />
      </TableContainer>

      {/* Role Dialog */}
      <Dialog open={roleDialogOpen} onClose={handleCloseRoleDialog}>
        <DialogTitle>Alterar Função do Usuário</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Usuário: <strong>{selectedUser?.name}</strong>
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Função</InputLabel>
            <Select
              value={selectedRole || ''}
              label="Função"
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            >
              <MenuItem value={UserRole.ADMIN}>Administrador</MenuItem>
              <MenuItem value={UserRole.MANAGER}>Gerente</MenuItem>
              <MenuItem value={UserRole.VIEWER}>Visualizador</MenuItem>
              <MenuItem value={UserRole.REGULAR_USER}>Usuário Regular</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoleDialog}>Cancelar</Button>
          <Button onClick={handleUpdateRole} variant="contained" disabled={!selectedRole}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
