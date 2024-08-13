'use client';
import React from "react";
import BasicLayout from "@/layouts/basic/basiclayout";
import { Button, Container } from "@mui/material";
import BoxConfirmation from "@/components/boxConfirmation";
import CardFood from "@/components/cardFodd";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

function CartView() {
    // Acessa a estrutura de carrinho corretamente
    const carrinho = useAppSelector(state => state.carrinho.items || []);
    console.log(carrinho);

    const totalValue = carrinho
        .map(item => {
            const preco = parseFloat(item.product.price);
            const quanto = parseInt(item.quantity, 10);
            return isNaN(preco) || isNaN(quanto) ? 0 : preco * quanto;
        })
        .reduce((acc, value) => acc + value, 0)
        .toFixed(2);

    const router = useRouter();

    const handleRedirect = () => {
        router.push('/');
    };

    return (
        <BasicLayout titulo="Carrinho/Comanda">
            <Container
                maxWidth=''
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
                        gridTemplateColumns: { xs: '1fr', sm: '0fr 0fr', lg: '1fr 1fr 1fr 1fr' },
                        gap: 1.5,
                        justifyContent: 'center',
                        marginBottom: '10vh',
                        alignItems: 'center',
                        padding: 5.5,
                        width: { xs: '100%', md: '80%' },
                        paddingRight: 0,
                    }}
                >
                    {carrinho.map(item => (
                        <CardFood
                            key={item.product.id} // Supondo que item.product.id é o identificador único
                            nome={item.product.name}
                            descricao={item.product.description}
                            preco={item.product.price}
                            imagem={item.product.image}
                            id={item.product.id}
                            quant={item.quantity}
                        />
                    ))}
                    <Button
                        onClick={handleRedirect}
                        sx={{
                            width: '100%',
                            color: 'white',
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
