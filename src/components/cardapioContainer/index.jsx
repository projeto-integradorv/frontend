'use client';
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { usePathname } from 'next/navigation';
import React from "react";
import CardFood from "../cardFodd";
import ImageHamburguer from '../../assets/x-salada.jpg';

export default function CardapioContainer() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return (
        <>
            <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} disableGutters={true}>
                {isHomePage ? (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:"100%" }}>
                            <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'gray' }}>Cadápio</Typography>
                            <Button href="/cardapio" sx={{ marginBottom: '1rem', color: 'gray' }}>Ver mais +</Button>
                        </Box>
                        <Grid container spacing={2}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <Grid item key={item} xs={12} sm={6} md={3}>
                                    <CardFood
                                        nome={'X-Salada'}
                                        descricao={"Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam"}
                                        imagem={ImageHamburguer} preco={'12,00'}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                            <Grid item key={item} xs={12} sm={6} md={3}>
                                <CardFood
                                    nome={'X-Salada'}
                                    descricao={"Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam"}
                                    imagem={ImageHamburguer} preco={'12,00'}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
}
