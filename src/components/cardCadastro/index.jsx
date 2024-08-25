'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { carregarCadastro } from '../../lib/features/cadastroUser/registerSlice'; // Somente a ação de cadastro
import { useRouter } from 'next/navigation';

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
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loading = useSelector((state) => state.register.loading);
  const error = useSelector((state) => state.register.error);
  const usuario = useSelector((state) => state.register.usuario);

  const handleRegister = () => {
    const userData = { name:name, email:email, password:password };
    dispatch(carregarCadastro(userData));
  };

  useEffect(() => {
    if (usuario) {
      router.push('/login');
    }
  }, [usuario, router]);

  return (
    <StyledCard>
      <CardContent>
        <StyledTextField
          fullWidth
          label="Nome"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledTextField
          fullWidth
          label="Email"
          type="email"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton
          variant="contained"
          onClick={handleRegister}
          disabled={loading}
        >
          Registrar
        </StyledButton>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </CardContent>
    </StyledCard>
  );
};

export default RegisterCard;
