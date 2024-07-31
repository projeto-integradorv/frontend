'use client'; // Indica que este arquivo é um componente de cliente

import React from "react";
import { Button, Card, CardContent, TextField, Typography, Box, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link'; // Importa o componente Link do Next.js

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  border:'none',
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius, // Bordas arredondadas para suavidade
  textAlign: 'center', // Centralizar o texto
  boxShadow: 'none', // Sombra para profundidade
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
  textTransform: 'none', // Evitar que o texto seja todo maiúsculo
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
  return (
    <StyledCard>
      <CardContent>
        {/* <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Login
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 3 }}>
          Acesse sua conta para continuar.
        </Typography> */}
        <StyledTextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
        />
        <StyledTextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
        />
        <StyledButton variant="contained">
          Entrar
        </StyledButton>
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
