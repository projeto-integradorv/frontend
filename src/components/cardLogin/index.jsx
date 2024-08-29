'use client';

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Link as MuiLink,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { carregarLogin } from '../../lib/features/login/loginSlice';
import { useRouter } from 'next/navigation';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  textAlign: 'center',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
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

const StyledLink = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.warning.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.warning.dark,
  },
  marginTop: theme.spacing(1),
  display: 'block',
}));

const LoginCard = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.login);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [open, setOpen] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoginAttempted(true);

    if (!email || !senha) {
      setOpen(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setOpen(true);
      return;
    }

    dispatch(carregarLogin({ username: email, password: senha }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledCard>
        <StyledCardContent>
          <StyledTextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            error={loginAttempted && !email}
            helperText={loginAttempted && !email && "Email é obrigatório"}
          />
          <StyledTextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
            error={loginAttempted && !senha}
            helperText={loginAttempted && !senha && "Senha é obrigatória"}
          />
          <StyledButton
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </StyledButton>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <StyledLink component={Link} href="/cadastro">
              Criar uma conta
            </StyledLink>
            <StyledLink component={Link} href="/recuperarsenha">
              Esqueceu a senha?
            </StyledLink>
          </Box>
        </StyledCardContent>
      </StyledCard>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {success ? (
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Login realizado com sucesso!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Erro no login: {error || 'Preencha todos os campos corretamente.'}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default LoginCard;
