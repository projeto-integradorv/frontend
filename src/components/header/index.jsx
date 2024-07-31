'use client';
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { usePathname } from 'next/navigation'

export default function Header({ titulo }) {
    const pathname = usePathname();

    // Verifica se o pathname corresponde ao padrão "/cardapio/product/[ID]"
    const match = pathname.match(/^\/cardapio\/product\/\d+$/);

    // Se corresponder, retorna null para ocultar o header
    if (match) {
        return null;
    }

    return (
        <header style={{ width: '100%', backgroundColor: '#FF9800' }}>
            <Container 
                sx={{ 
                    backgroundColor: '#FF9800', 
                    height: '40vh', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }} 
                maxWidth='lg' 
                disableGutters={true}
            >
                <Box
                    width={"100%"}
                    height={'100%'}
                    display={'flex'}
                    alignItems={'flex-start'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    sx={{ color: 'white' }}
                >
                    {pathname === '/' ? (
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            sx={{ 
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.75rem' }
                            }}
                        >
                            Olá <br />
                            {titulo}
                        </Typography>
                    ) : pathname !== '/produtoadicionais' ? (
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            sx={{ 
                                fontSize: { xs: '1rem', sm: '2.5rem', md: '3rem', lg: '3.75rem' }
                            }}
                        >
                            {titulo}
                        </Typography>
                    ) : (
                        <></>
                    )}
                </Box>
            </Container>
        </header>
    );
}
