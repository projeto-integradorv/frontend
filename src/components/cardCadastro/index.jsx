'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TextField, Button, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { carregarCadastro } from '../../lib/features/cadastroUser/registerSlice'; // Somente a ação de cadastro
import { useRouter } from 'next/navigation';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerAttempted, setRegisterAttempted] = useState(false);
  const [open, setOpen] = useState(false);

  const loading = useSelector((state) => state.register.loading);
  const error = useSelector((state) => state.register.error);
  const usuario = useSelector((state) => state.register.usuario);

  const handleRegister = () => {
    setRegisterAttempted(true);

    if (!name || !email || !password) {
      setOpen(true);
      return;
    }

    const userData = { name: name, email: email, password: password };  
    dispatch(carregarCadastro(userData));
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (usuario) {
      router.push('/login');
    }
  }, [usuario, router]);

  return (
    <>
      <StyledCard>
        <CardContent>
          <StyledTextField
            fullWidth
            label="Nome"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={registerAttempted && !name}
            helperText={registerAttempted && !name && "Nome é obrigatório"}
          />
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={registerAttempted && !email}
            helperText={registerAttempted && !email && "Email é obrigatório"}
          />
          <StyledTextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={registerAttempted && !password}
            helperText={registerAttempted && !password && "Senha é obrigatória"}
          />
          <StyledButton
            variant="contained"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </StyledButton>
        </CardContent>
      </StyledCard>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {usuario ? (
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Cadastro realizado com sucesso!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error || 'Preencha todos os campos corretamente.'}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default RegisterCard;
