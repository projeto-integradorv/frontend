'use client'; // Certifique-se de que este arquivo está no cliente

import React from "react";
import { Card, CardContent, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(4),
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

const RegisterCard = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Cadastro
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 3 }}>
          Crie sua conta para começar a usar o nosso serviço.
        </Typography>
        <StyledTextField
          fullWidth
          label="Nome"
          variant="outlined"
          margin="normal"
        />
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
          Registrar
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

export default RegisterCard;
