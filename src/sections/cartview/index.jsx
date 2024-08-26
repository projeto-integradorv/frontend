'use client';  // Garantir que o código seja executado no lado do cliente

import React, { useEffect } from "react";
import BasicLayout from "@/layouts/basic/basiclayout";
import { Button, Container } from "@mui/material";
import BoxConfirmation from "@/components/boxConfirmation";
import CardFood from "@/components/cardFodd"; // Corrigido o nome do componente
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { atualizarCarrinhoInteiro, buscarCarrinhoById, resetarCarrinho } from "@/lib/features/carrinho/carrinhoSlice";

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
        dispatch(resetarCarrinho());
        const storedCartData = localStorage.getItem('userData');

        if (storedCartData) {
            const parsedCartData = JSON.parse(storedCartData);
            const cartId = parsedCartData.cart_id?.id;

            if (cartId) {
                dispatch(resetarCarrinho());
                dispatch(buscarCarrinhoById(cartId));
            }
        }



    };

    if (status === 'loading') return <p>Carregando...</p>;
    if (status === 'failed') return <p>Erro: {error.message}</p>;

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
                                imagem={item.product?.image || "/default-image.png"}
                                id={item.product?.id || `item-${idx}`}
                                quant={item.quantity || 0}
                                obs={item.observation || 'sem Observação'} 
                            />
                        ))
                    ) : (
                        <p>Nenhum item no carrinho.</p>
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
