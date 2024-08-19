'use client';
import Img from '@/assets/x-salada.jpg';
import CardFood from "@/components/cardFodd";
import ModalProduto from "@/components/modalIsertUpdate"; 
import { carregarProdutos, apagarProduto } from "@/lib/features/produtos/produtoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

export default function CardapioContainer({Id}) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isAdmPage = pathname === '/admin';
    const isCardapioPage = pathname.startsWith('/cardapio/');
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

    const handleDeleteProduct = async (productId) => {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff9800',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            dispatch(apagarProduto(productId));
            Swal.fire(
                'Excluído!',
                'O produto foi excluído.',
                'success'
            );
        }
    };

    return (
        <Container
            maxWidth='lg'
            sx={{
                backgroundColor: 'transparent',
                height: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginBottom: '1%',
            }}
            disableGutters={true}
        >
            {(isHomePage || isAdmPage) ? (
                <>
                    {isAdmPage ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: "100%"
                            }}
                        >
                            <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'gray' }}>
                                Produtos
                            </Typography>
                            <Button
                                sx={{ marginBottom: '1rem', color: 'gray' }}
                                onClick={() => handleOpenModal(null)} 
                            >
                                Adicionar +
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: "100%"
                            }}
                        >
                            <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'gray' }}>
                                Cardápio
                            </Typography>
                            <Button href="/cardapio" sx={{ marginBottom: '1rem', color: 'gray' }}>
                                Ver mais +
                            </Button>
                        </Box>
                    )}
                    <Grid container spacing={2}>
                        {foods.map((food) => (
                            <Grid item key={food.id} xs={12} sm={6} md={3}>
                                <CardFood
                                    produto={food}
                                    nome={food.name || 'Nome não disponível'}
                                    descricao={food.description || 'Descrição não disponível'}
                                    imagem={food.image || Img}
                                    preco={food.price || 0}
                                    id={food.id}
                                    onDelete={() => handleDeleteProduct(food.id)} 
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {isAdmPage && (
                        <ModalProduto
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            produto={selectedProduct} 
                        />
                    )}
                </>
            ) : (
                <Grid container spacing={2}>
                    {foods.map((food) => (
                        <Grid item key={food.id} xs={12} sm={6} md={3}>
                            <CardFood
                                produto={food}
                                nome={food.name || 'Nome não disponível'}
                                descricao={food.description || 'Descrição não disponível'}
                                imagem={food.image || Img}
                                preco={food.price || 0}
                                id={food.id}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
