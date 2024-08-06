'use client'; // Diretiva para garantir que este código seja executado apenas no cliente

import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModalPagamento from '../modalpagament';
import iconDel from '@/assets/Group 33.png';

export default function CardFood({ nome, descricao, preco, imagem, id, quant, onUpdateQuantity }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const nomeLimitado = nome > 30 ? nome.substring(0, 30) + '...' : nome;
    const descricaoLimitada = descricao > 25 ? descricao.substring(0, 25) + '...' : descricao;
    const rota = `cardapio/product/${id}`;
    const pathname = usePathname();

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = (newQuantity) => {
        onUpdateQuantity(id, newQuantity);
        handleCloseModal();
    };

    return (
        <>
            {pathname === '/cart' ? (
                <Grid
                    container
                    sx={{
                        backgroundColor: 'transparent',
                        height: '100%',
                        width: '95%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                        borderRadius: '20px',
                        position: 'relative',
                        '@media (max-width: 1024px)': {
                            width: '100%',
                        },
                        '@media (max-width: 768px)': {
                            gap: 1,
                            width: '100%',
                        },
                        '@media (max-width: 480px)': {
                            width: '90%',
                        },
                        cursor: 'pointer',
                    }}
                    onClick={handleCardClick}
                >
                    <Card sx={{ width: '100%', position: 'relative', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                        <Image
                            src={imagem}
                            alt={nome}
                            width={350}
                            height={250}
                            objectFit="cover"
                            style={{ borderRadius: '20px 20px 0 0' }}
                        />
                        <Button
                            aria-label="delete"
                            sx={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                zIndex: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                padding: '4px',
                                minWidth: 0,
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                // Função para deletar o item
                            }}
                        >
                            <Image
                                src={iconDel}
                                alt={'delete'}
                                width={34}
                                height={34}
                            />
                        </Button>
                        <CardContent sx={{ padding: 2 }}>
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}
                            >
                                <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {nomeLimitado}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {descricaoLimitada}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="body2" color="textSecondary">
                                    qt: {quant}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    a partir de&nbsp;
                                    <Typography variant="body2" component="span" sx={{ color: '#52c5a6' }}>
                                        {preco} R$
                                    </Typography>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <ModalPagamento
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        nomeProduto={nome}
                        imagemProduto={imagem}
                        descricaoProduto={descricao}
                        productPrice={preco}
                        quanty={quant}
                        handleUpdate={handleUpdate}
                    />
                </Grid>
            ) : (
                <Link href={rota} passHref style={{textDecoration:'none', display:'flex', justifyContent:'center'}}>
                    <Box component="div" sx={{ textDecoration: 'none', width: '100%', display: 'block', margin: '1%' ,'@media (max-width: 600px)': {
                                width: '70%',
                            } }}>
                        <Card sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '20px' }}>
                            <Image
                                src={imagem}
                                alt={nome}
                                width={290}
                                height={250}
                                style={{ borderRadius: '20px 20px 0 0' }}
                            />
                            <CardContent sx={{ padding: 2 }}>
                                <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {nomeLimitado}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                    {descricaoLimitada}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    a partir de&nbsp;
                                    <Typography variant="h6" component="span" sx={{ color: '#52c5a6', fontWeight: 'bold' }}>
                                        {preco} R$
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Link>
            )}
        </>
    );
}
