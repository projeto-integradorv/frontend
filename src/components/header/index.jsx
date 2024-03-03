'use client';
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { usePathname } from 'next/navigation'


export default function Header({ titulo }) {

    const pathname = usePathname();

    pathname === '/'

    return (
        <header style={{ width: '100%', backgroundColor: '#FF9800' }}>
            <Container sx={{ backgroundColor: '#FF9800', height: '40vh' }} maxWidth='lg' disableGutters={true}>
                <Box width={"100%"}
                    height={'100%'}
                    display={'flex'}
                    alignItems={'flex-start'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    sx={{ color: 'white' }}>
                        {pathname === '/' ? (
                        <Typography variant="h3" component="h1">
                            Olá
                        </Typography>
                        ) : (
                          ''
                        )}
                    <Typography variant="h3" component="h1">
                            {titulo}
                    </Typography>
                </Box>
            </Container>
        </header>
    );
}