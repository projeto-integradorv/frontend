'use client'; // Diretiva para garantir que este código seja executado apenas no cliente

import React from "react";
import { Container, Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Sombra suave para profundidade
  borderRadius: theme.shape.borderRadius, // Bordas arredondadas para suavidade
  textAlign: 'center', // Centralizar o texto
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

export default function RecuperarView() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar o email de recuperação de senha
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 0 }}
    >
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
            Recuperar Senha
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 3 }}>
            Insira seu email para receber instruções sobre como recuperar sua senha.
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ style: { color: '#333333' } }}
              required
            />
            <StyledButton type="submit" variant="contained">
              Enviar Instruções
            </StyledButton>
          </form>
        </CardContent>
      </StyledCard>
    </Container>
  );
}
