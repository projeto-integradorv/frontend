'use client'; 
import LoginCard from "@/components/cardLogin";
import { Box, Container, Typography } from '@mui/material';

export default function LoginView() {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#f0f2f5', 
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
                    backgroundColor: '#ffffff',
                    borderRadius: 3,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    padding: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Seja bem-vindo!
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 4 }}>
                    Entre com suas credenciais para acessar sua conta.
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <LoginCard />
                </Box>
            </Container>
        </Box>
    );
}
