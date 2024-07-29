// src/pages/CartView.js

import React from "react";
import BasicLayout from "@/layouts/basic/basiclayout";
import { Container } from "@mui/material";
import BoxConfirmation from "@/components/boxConfirmation";
import CardFood from "@/components/cardFodd";
import img from "../../assets/x-bacon.jpeg";

// Dados Mocados
const mockFoodItems = [
    {
        nome: "X-Salada",
        descricao: "Pão, hambúrguer, queijo, alface e tomate",
        preco: 15.00,
        imagem: img,
        id: "1",
        quanto: 1,
    },
    {
        nome: "X-Bacon",
        descricao: "Pão, hambúrguer, queijo, bacon, alface e tomate",
        preco: 18.00,
        imagem: img,
        id: "2",
        quanto: 1,
    },
    {
        nome: "X-Tudo",
        descricao: "Pão, hambúrguer, queijo, bacon, ovo, alface e tomate",
        preco: 20.00,
        imagem: img,
        id: "3",
        quanto: 1,
    },
    {
        nome: "X-Burguer",
        descricao: "Pão, hambúrguer, queijo, alface e tomate",
        preco: 15.00,
        imagem: img,
        id: "4",
        quanto: 1,
    },
    {
        nome: "X-Salada",
        descricao: "Pão, hambúrguer, queijo, alface e tomate",
        preco: 15.00,
        imagem: img,
        id: "1",
        quanto: 1,
    },
    {
        nome: "X-Bacon",
        descricao: "Pão, hambúrguer, queijo, bacon, alface e tomate",
        preco: 18.00,
        imagem: img,
        id: "2",
        quanto: 1,
    },
    {
        nome: "X-Tudo",
        descricao: "Pão, hambúrguer, queijo, bacon, ovo, alface e tomate",
        preco: 20.00,
        imagem: img,
        id: "3",
        quanto: 1,
    },
    {
        nome: "X-Burguer",
        descricao: "Pão, hambúrguer, queijo, alface e tomate",
        preco: 15.00,
        imagem: img,
        id: "4",
        quanto: 1,
    },


];

// Componente CartView
function CartView() {
    // Calcular o valor total dos produtos
    const totalValue = mockFoodItems
        .map(item => {
            const preco = parseFloat(item.preco);
            const quanto = parseInt(item.quanto, 10);
            return isNaN(preco) || isNaN(quanto) ? 0 : preco * quanto;
        })
        .reduce((acc, value) => acc + value, 0)
        .toFixed(2);
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
                        gridTemplateColumns: { xs: '0fr', sm: '0fr 0fr', lg: '1fr 1fr 1fr 1fr' },
                        gap: 1.5,
                        justifyContent: 'center',
                        marginBottom: '10vh',
                        alignItems: 'center',
                        padding: 0,
                        width: { xs: '100%', md: '80%' },
                        paddingRight: 0,
                    }}
                >
                    {mockFoodItems.map(item => (
                        <CardFood
                            key={item.id}
                            nome={item.nome}
                            descricao={item.descricao}
                            preco={item.preco.toFixed(2)}
                            imagem={item.imagem}
                            id={item.id}
                            quant={item.quanto}
                        />
                    ))}
                </Container>
                <BoxConfirmation
                valorFinal={totalValue}
                sx={{ width: { xs: '100%', md: '30%' } }}>

                      
                </BoxConfirmation>
            </Container>
        </BasicLayout>
    );
}

export default CartView;
