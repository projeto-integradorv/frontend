'use client';
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import CardFood from "@/components/cardFodd";
import Hamburguer from '@/assets/x-bacon.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { adicionarProduto } from "@/store/reducers/products";
import { getProducts } from "@/api/product";

export default function CardapioContainer() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts().then((products) => {
            dispatch(adicionarProduto(products));
        });
    }, [dispatch]);

    const foods = useSelector((state) => state.produtos);

    return (
        <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginBottom: '1%' }} disableGutters={true}>
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
                                    imagem={food.image ? food.image : Hamburguer}
                                    preco={food.price}
                                    id={food.id}
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
                                imagem={food.image ? food.image : Hamburguer}
                                preco={food.price}
                                id={food.id}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}