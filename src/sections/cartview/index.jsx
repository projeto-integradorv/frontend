import CardFood from "@/components/cardFodd";
import BasicLayout from "@/layouts/basic/basiclayout";
import { Container } from "@mui/material";
import React from "react";
import img from "../../assets/x-salada.jpg"


export default function CartView() {

    return (
        <>

            <BasicLayout titulo="Carrinho">

                <Container>

                    <CardFood nome="Pizza de Calabresa" descricao="Pizza de calabresa com cebola" preco="25,00" imagem={img} id="1" quant="1" />

                </Container>


            </BasicLayout>

        </>
    );
}