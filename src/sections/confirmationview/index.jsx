'use client';
import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from '@mui/material';
import imgConfirmation from '../../assets/check-circle.png';
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function VerifideView() {
    const [showConfirmation, setShowConfirmation] = useState(true);


    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfirmation(false);
        }, 10000); // 3000ms = 3 segundos

        return () => clearTimeout(timer) , router.push('/pedidos'); // Limpa o temporizador se o componente desmontar
    }, []);

    return (
        showConfirmation && (
            <Container disableGutters={true} maxWidth={'xl'}>
                <Box
                    width={'100%'}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    bgcolor="#FF9800"
                >
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Image src={imgConfirmation} alt="imagem de confirmação"/>
                        </Grid>
                        <Grid item >
                            <Typography variant="h5" style={{ color: 'white',textAlign: 'center', marginTop: '20px'
                            }}>
                                Ação Confirmada
                            </Typography>

                            <Typography variant="body1" style={{ color: 'white', textAlign:'center' }}>
                            O seu pedido foi enviado para a cozinha, agora aguarde alguns minutos, por gentileza
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )
    );
}
