import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Link,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import type { RegisterData } from '../types/user.types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, error, loading, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Criar Conta
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Registre-se para acessar o painel
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Conta criada com sucesso! Aguarde a ativação por um administrador.
              Redirecionando para login...
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome Completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="name"
              autoFocus
              disabled={loading || success}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
              disabled={loading || success}
            />
            <TextField
              fullWidth
              label="Telefone (opcional)"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              autoComplete="tel"
              disabled={loading || success}
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="new-password"
              helperText="Mínimo de 6 caracteres"
              disabled={loading || success}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || success}
            >
              {loading ? <CircularProgress size={24} /> : 'Registrar'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Já tem uma conta?{' '}
                <Link component={RouterLink} to="/login" underline="hover">
                  Fazer login
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
