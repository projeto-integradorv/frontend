'use client';
import Img from '@/assets/x-salada.jpg';
import CardFood from "@/components/cardFodd";
import ModalProduto from "@/components/modalIsertUpdate"; // Certifique-se de importar o componente ModalProduto
import { carregarProdutos } from "@/lib/features/produtos/produtoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function CardapioContainer() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isAdmPage = pathname === '/admin';
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(carregarProdutos());
    }, [dispatch]);

    const foods = useAppSelector((state) => state.produtos.produtos);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginBottom: '1%' }} disableGutters={true}>
            {isHomePage || isAdmPage ? (
                <>
                    {isAdmPage ? (
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                            <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'gray' }}>Produtos</Typography>
                            <Button
                                sx={{ marginBottom: '1rem', color: 'gray' }}
                                onClick={() => handleOpenModal(null)} // Passa null ou um produto específico se necessário
                            >
                                Adicionar +
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                            <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'gray' }}>Cardápio</Typography>
                            <Button href="/cardapio" sx={{ marginBottom: '1rem', color: 'gray' }}>Ver mais +</Button>
                        </Box>
                    )}
                    <Grid container spacing={2}>
                        {foods.map((food) => (
                            <Grid item key={food.id} xs={12} sm={6} md={3}>
                                <CardFood
                                    produto={food}
                                    nome={food.name}
                                    descricao={food.description}
                                    imagem={food.image === null ? Img : food.image}
                                    preco={food.price}
                                    id={food.id}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {isAdmPage && (
                        <ModalProduto
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                        />
                    )}
                </>
            ) : (
                <Grid container spacing={2}>
                    {foods.map((food) => (
                        <Grid item key={food.id} xs={12} sm={6} md={3}>
                            <CardFood
                                produto={food}
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
