'use client';
import React from "react";
import { Card, CardContent, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius, 
  textAlign: 'center',
  boxShadow: 'none', 
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.warning.dark,
  },
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightBold,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: theme.palette.text.primary,
  },
  '& label.Mui-focused': {
    color: theme.palette.warning.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.warning.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[400],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.warning.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.warning.main,
    },
  },
}));

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
