'use client';
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from "react";
import CardFood from "../cardFodd";
import axiosInstance from '@/utils/axios'; // Importe sua instância Axios
import ImageHamburguer from '../../assets/x-bacon.jpeg';

export default function CardapioContainer() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axiosInstance.get('/product/'); // Substitua '/sua-rota' pela rota desejada
                setFoods(response.data); // Define os alimentos recebidos no estado
            } catch (error) {
                console.error('Erro ao obter alimentos:', error);
            }
        };

        // Chama a função fetchFoods quando o componente é montado
        fetchFoods();
    }, []); // O segundo argumento é uma matriz vazia, isso faz com que o useEffect só seja executado uma vez (após o componente ser montado)

    return (
        <>
            <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginBottom:'1%' }} disableGutters={true}>
                {isHomePage ? (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                            <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'gray' }}>Cadápio</Typography>
                            <Button href="/cardapio" sx={{ marginBottom: '1rem', color: 'gray' }}>Ver mais +</Button>
                        </Box>
                        <Grid container spacing={2}>
                            {foods.map((food) => (
                                <Grid item key={food.id} xs={12} sm={6} md={3}>
                                    <CardFood
                                        nome={food.name}
                                        descricao={food.description}
                                        imagem={food.image}
                                        preco={food.price}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Grid container spacing={2}>
                        {foods.map((food) => (
                            <Grid item key={food.id} xs={12} sm={6} md={3}>
                                <CardFood
                                    nome={food.name}
                                    descricao={food.description}
                                    imagem={food.image}
                                    preco={food.price}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
}
