'use client'; // Esta linha deve estar no topo do arquivo

import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModalProduto from '../modalIsertUpdate'; // Importe o ModalProduto
import iconDel from '@/assets/Group 33.png';
import Img from '@/assets/x-bacon.jpeg'


export default function CardFood({ nome, descricao, preco, imagem, id, quant, onUpdateQuantity, produto }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const nomeLimitado = nome.length > 30 ? nome.substring(0, 30) + '...' : nome;
    const descricaoLimitada = descricao.length > 25 ? descricao.substring(0, 25) + '...' : descricao;
    const rota = `cardapio/product/${id}`;
    const pathname = usePathname();

    const handleCardClick = () => {
        if (pathname === '/admin') {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {pathname === '/cart' || pathname === '/admin' ? (
                <Grid
                    container
                    sx={{
                        backgroundColor: 'transparent',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 0,
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
                            padding: 0,
                            margin: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                        cursor: 'pointer',
                    }}
                    onClick={handleCardClick}
                >
                        <Card sx={{ width: '100%', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '20px' }}>
                            <Image
                                src={imagem}
                                alt={nome}
                                layout="responsive"
                                width={100}
                                height={100}
                                style={{ borderRadius: '20px' }}
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
                                    e.stopPropagation(); // Evitar que o clique no botão delete abra o modal
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
                    {pathname === '/admin' && (
                        <ModalProduto
                            Image={Img}
                            produto={produto}
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                        />
                    )}
                </Grid>
            ) : (
                <Link href={rota} passHref style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                    <Box component="div" sx={{ textDecoration: 'none', width: { xs: '100%', md: '90%' }, display: 'block', margin: '1%' }}>
                        <Card sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '20px', minHeight: '300px' }}>
                            <Image
                                src={imagem}
                                alt={nome}
                                layout="responsive"
                                width={100}
                                height={100}
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
