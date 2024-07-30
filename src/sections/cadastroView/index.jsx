'use client'; // Diretiva para garantir que este código seja executado apenas no cliente

import RegisterCard from "@/components/cardCadastro"; // Certifique-se de que o caminho está correto
import { Box, Container, Typography } from '@mui/material';

export default function CadastroView() {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    backgroundColor: '#f0f2f5', // Fundo mais neutro e moderno
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
                        backgroundColor: '#ffffff', // Fundo branco para o conteúdo principal
                        borderRadius: 3, // Bordas levemente mais arredondadas para suavidade
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)', // Sombra mais pronunciada para maior profundidade
                        padding: 4, // Espaçamento interno generoso
                        textAlign: 'center', // Centralizar texto para alinhamento visual
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Criar Conta
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 4 }}>
                        Preencha o formulário abaixo para criar uma nova conta.
                    </Typography>
                    <Box sx={{ width: '100%', marginY: 4 }}>
                        <RegisterCard />
                    </Box>
                </Container>
            </Box>
        </>
    );
}
