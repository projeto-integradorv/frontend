import CardFood from "@/components/cardFodd";
import BasicLayout from "@/layouts/basic/basiclayout";
import { Container } from "@mui/material";
import React from "react";
import img from "../../assets/x-salada.jpg"
import BoxConfirmation from "@/components/boxConfirmation";


export default function CartView() {

    return (
        <>

            <BasicLayout titulo="Carrinho">

                <Container maxWidth='' disableGutters={true} sx={{display:'flex', justifyContent:'center',alignItems:'center' , marginTop:-10}}>
                    <Container maxWidth='' sx={{display:'flex', flexWrap:'wrap' , padding:2 , gap:3, justifyContent:'center'}}>
                        <CardFood nome="X-Salada" descricao="Pão, hambúrguer, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Bacon" descricao="Pão, hambúrguer, queijo, bacon, alface e tomate" preco="18,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Tudo" descricao="Pão, hambúrguer, queijo, bacon, ovo, alface e tomate" preco="20,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Frango" descricao="Pão, frango, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Calabresa" descricao="Pão, calabresa, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Vegano" descricao="Pão, hambúrguer de soja, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Salada" descricao="Pão, hambúrguer, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Bacon" descricao="Pão, hambúrguer, queijo, bacon, alface e tomate" preco="18,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Tudo" descricao="Pão, hambúrguer, queijo, bacon, ovo, alface e tomate" preco="20,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Frango" descricao="Pão, frango, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Calabresa" descricao="Pão, calabresa, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Salada" descricao="Pão, hambúrguer, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Bacon" descricao="Pão, hambúrguer, queijo, bacon, alface e tomate" preco="18,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Tudo" descricao="Pão, hambúrguer, queijo, bacon, ovo, alface e tomate" preco="20,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Frango" descricao="Pão, frango, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Calabresa" descricao="Pão, calabresa, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Vegano" descricao="Pão, hambúrguer de soja, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Salada" descricao="Pão, hambúrguer, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Bacon" descricao="Pão, hambúrguer, queijo, bacon, alface e tomate" preco="18,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Tudo" descricao="Pão, hambúrguer, queijo, bacon, ovo, alface e tomate" preco="20,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Frango" descricao="Pão, frango, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        <CardFood nome="X-Calabresa" descricao="Pão, calabresa, queijo, alface e tomate" preco="15,00" imagem={img} id="1" quant="1" />
                        
                    </Container>
                </Container>

                <BoxConfirmation/>


            </BasicLayout>

        </>
    );
}