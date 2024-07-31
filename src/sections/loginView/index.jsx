'use client'; // Diretiva para garantir que este código seja executado apenas no cliente

import LoginCard from "@/components/cardLogin"; // Certifique-se de que o caminho está correto
import { Box, Container, Typography } from '@mui/material';

export default function LoginView() {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    backgroundColor: '#f0f2f5', // Fundo neutro e moderno
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#ffffff', // Fundo branco para o card de login
                        borderRadius: 3, // Bordas suavemente arredondadas
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)', // Sombra para profundidade
                        padding: 4, // Espaçamento interno
                        textAlign: 'center', // Centralizar o texto
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Seja bem-vindo!
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 4 }}>
                        Entre com suas credenciais para acessar sua conta.
                    </Typography>
                    <Box sx={{ width: '100%', marginY: 4 }}>
                        <LoginCard />
                    </Box>
                </Container>
            </Box>
        </>
    );
}
