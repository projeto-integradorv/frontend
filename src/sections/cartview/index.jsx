'use client';  // Garantir que o código seja executado no lado do cliente

import BoxConfirmation from "@/components/boxConfirmation";
import CardFood from "@/components/cardFodd"; // Corrigido o nome do componente
import BasicLayout from "@/layouts/basic/basiclayout";
import { apagarItemCart, buscarCarrinhoById, removerDoCarrinho, resetarCarrinho, zerarCarrinho } from "@/lib/features/carrinho/carrinhoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";
import '../../components/categoria/Swall.css';

function CartView() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const carrinho = useAppSelector(state => state.carrinho.items || []);
    const status = useAppSelector(state => state.carrinho.status);
    const error = useAppSelector(state => state.carrinho.error);

    useEffect(() => {
        const storedCartData = localStorage.getItem('userData');

        if (storedCartData) {
            const parsedCartData = JSON.parse(storedCartData);
            const cartId = parsedCartData.cart_id?.id;

            if (cartId) {
                dispatch(buscarCarrinhoById(cartId));
            }
        }
    }, [dispatch]);

    const items = Array.isArray(carrinho) ? carrinho.reduce((acc, item) => {
        return acc.concat(item.items || []);
    }, []) : [];

    const totalValue = items
        .map(item => {
            const preco = parseFloat(item.product?.price || "0");
            const quanto = parseInt(item.quantity || "0", 10);
            return isNaN(preco) || isNaN(quanto) ? 0 : preco * quanto;
        })
        .reduce((acc, value) => acc + value, 0)
        .toFixed(2);

    const observacao = items.map(item => item.observation || '');

    const handleRedirect = () => {
        router.push('/');
    };

    const handleReset = () => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Isso vai zerar todo o carrinho!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, resetar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const storedCartData = localStorage.getItem('userData');
                if (storedCartData) {
                    const parsedCartData = JSON.parse(storedCartData);
                    const cartId = parsedCartData.cart_id?.id;
                    if (cartId) {
                        dispatch(zerarCarrinho(cartId));
                        dispatch(resetarCarrinho());
                        Swal.fire(
                            'Resetado!',
                            'Seu carrinho foi zerado.',
                            'success'
                        );
                    }
                }
            }
        });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Isso vai remover o item do carrinho!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, remover!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const storedCartData = localStorage.getItem('userData');
                if (storedCartData) {
                    const parsedCartData = JSON.parse(storedCartData);
                    const cartId = parsedCartData.cart_id?.id;

                    if (cartId) {
                        dispatch(apagarItemCart(id));
                        dispatch(buscarCarrinhoById(cartId));
                        dispatch(removerDoCarrinho(id)); // Corrigido para remover o item específico pelo ID
                        Swal.fire(
                            'Removido!',
                            'O item foi removido do carrinho.',
                            'success'
                        );
                    }
                }
            }
        });
    };

    if (status === 'loading') return <p>Carregando...</p>;
    if (status === 'failed') return <p>Erro: {error?.message || 'Ocorreu um erro ao carregar o carrinho.'}</p>;

    return (
        <BasicLayout titulo="Carrinho/Comanda">
            <Container
                disableGutters={true}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    marginBottom: '10vh'
                }}
            >
                <Container
                    maxWidth='lg'
                    disableGutters={true}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
                        gap: 1.5,
                        justifyContent: 'center',
                        marginBottom: '10vh',
                        alignItems: 'center',
                        padding: 5.5,
                        width: { xs: '100%', md: '100%' },
                        paddingRight: 0,
                    }}
                >
                    {items.length > 0 ? (
                        items.map((item, idx) => (
                            <CardFood
                                key={`${item.product?.id}-${idx}`}
                                nome={item.product?.name || "Nome desconhecido"}
                                descricao={item.product?.description || "Descrição não disponível"}
                                preco={item.product?.price || "0.00"}
                                imagem={item.product?.image || ''}
                                id={item.product?.id || `item-${idx}`}
                                quant={item.quantity || 0}
                                obs={item.observation || 'sem Observação'}
                                index={idx}
                                itemId={item?.id || '0'}
                                produto={item.product?.id || '0'}
                                addicionais={item.product?.additionals || []}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <Box width={'100%'} height={'20vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

                            <Typography variant={'h6'} sx={{ color: 'gray' }}>Nenhum item no carrinho</Typography>

                        </Box>
                    )}
                    <Button
                        onClick={handleRedirect}
                        sx={{
                            gridColumn: '1/ -1',
                            color: 'white',
                            Width: '20%',
                            minWidth: '200px',
                            border: '2px solid #ff9800',
                            backgroundColor: '#ff9800',
                            '&:hover': {
                                backgroundColor: '#fda116',
                                borderColor: '#fda116',
                                color: 'white',
                            },
                            fontSize: '16px',
                            padding: '12px',
                            textAlign: 'center',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            '@media (max-width: 600px)': {
                                width: '90%',
                            }
                        }}
                    >
                        Adicionar mais itens
                    </Button>
                    <Button
                        onClick={handleReset}
                        sx={{
                            gridColumn: '1/ -1',
                            color: 'white',
                            Width: '20%',
                            minWidth: '200px',
                            border: '2px solid #ff5722',
                            backgroundColor: '#ff5722',
                            '&:hover': {
                                backgroundColor: '#e64a19',
                                borderColor: '#e64a19',
                                color: 'white',
                            },
                            fontSize: '16px',
                            padding: '12px',
                            textAlign: 'center',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            '@media (max-width: 600px)': {
                                width: '90%',
                            }
                        }}
                    >
                        Resetar Carrinho
                    </Button>
                </Container>

                <BoxConfirmation
                    valorFinal={totalValue}
                    sx={{ width: { xs: '100%', md: '30%' } }}
                />
            </Container>
        </BasicLayout>
    );
}

export default CartView;
