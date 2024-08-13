'use client'; // Indica que este arquivo é um componente de cliente

import React, { useState } from "react";
import { Button, Card, CardContent, TextField, Typography, Box, Link as MuiLink, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link'; // Importa o componente Link do Next.js
import { useDispatch, useSelector } from 'react-redux';
import { carregarLogin } from '@/lib/features/login/loginSlice'; // Importe a ação de login

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  border: 'none',
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  boxShadow: 'none',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#ff9800',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#fda116',
  },
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 'bold',
}));

const StyledTextField = styled(TextField)({
  '& label': {
    color: '#333333',
  },
  '& label.Mui-focused': {
    color: '#ff9800',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ff9800',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#cccccc',
    },
    '&:hover fieldset': {
      borderColor: '#ff9800',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff9800',
    },
  },
});

const StyledLink = styled(MuiLink)(({ theme }) => ({
  color: '#ff9800',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: '#fda116',
  },
  marginTop: theme.spacing(1),
  display: 'block',
}));

const LoginCard = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.login);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const credentials = { email, senha };
    dispatch(carregarLogin(credentials));
  };

  return (
    <StyledCard>
      <CardContent>
        <StyledTextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <StyledButton variant="contained" onClick={handleLogin} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </StyledButton>

        {/* Exibir mensagem de sucesso ou erro */}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Login realizado com sucesso!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Erro no login: {error}
          </Alert>
        )}

        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <StyledLink component={Link} href="/cadastro">
            Criar uma conta
          </StyledLink>
          <StyledLink component={Link} href="/recuperarsenha">
            Esqueceu a senha?
          </StyledLink>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default LoginCard;
