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

const RegisterCard = () => {
  return (
    <StyledCard>
      <CardContent>
        
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
