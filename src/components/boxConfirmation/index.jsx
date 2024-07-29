'use client';
import React, { useState } from "react";
import { Box, Button, Container, FormControl, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { usePathname, useRouter } from "next/navigation";

export default function BoxConfirmation({ title, message, onConfirm, onCancel, valorFinal, productImage, productName, productDescription, productPrice }) {
    const [count, setCount] = useState(1);
    const pathname = usePathname();
    const router = useRouter();

    const handleQuantidadeChange = (quantidade) => {
        setCount((prevCount) => Math.max(0, prevCount + quantidade));
    };

    const handleRedirect = () => {
        router.push('/cart');
    };

    // Extrai o ID da URL assumindo o formato `/cardapio/product/[id]`
    const idPattern = /\/cardapio\/product\/([^\/]+)/;
    const match = pathname.match(idPattern);
    const productId = match ? match[1] : null;

    return (
        <>
            {productId ? (
                <Container 
                    maxWidth='' 
                    disableGutters={true}
                    sx={{
                        margin: 0,
                        padding: 0,
                        width: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        gap: 2,
                        bottom: 0,
                        height: '10%',
                        padding: '20px',
                        zIndex: 1000,
                        boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.449)' , // Para garantir que esteja sempre na frente de outros elementos

                        // Media query para dispositivos menores
                        '@media (max-width: 600px)': {
                            height: '10%', 
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center' // Altura aumentada para dispositivos menores
                        }
                    }}
                >
                    <Grid container sx={{ flexGrow: 1 }}>
                        <Grid item xs={6} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                            '@media (max-width: 600px)': {
                                justifyContent: 'center',
                            }
                        }}>
                            <FormControl>
                                <Button
                                    onClick={() => handleQuantidadeChange(-1)}
                                    disabled={count <= 0}
                                    sx={{ border: 'none', minWidth: '50px', fontSize: '20px' }}
                                >
                                    <RemoveIcon sx={{ color: 'red', fontSize: '20px' }} />
                                </Button>
                            </FormControl>
                            <FormControl>
                                <input
                                    type="number"
                                    value={count}
                                    readOnly
                                    style={{ fontSize: '20px', width: '50px', height: '100%', textAlign: 'center', border: 'none', pointerEvents: 'none', borderSolid: '1px #ff9800' }}
                                />
                            </FormControl>
                            <FormControl>
                                <Button 
                                sx={{ border: 'none', minWidth: '50px', fontSize: '20px' }} 
                                onClick={() => handleQuantidadeChange(1)}
                                    >
                                    <AddIcon sx={{ color: 'red', fontSize: '20px' }} />
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button
                                sx={{
                                    flexDirection: 'row',
                                    width: '60%',
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    padding: '10px',
                                    textAlign: 'center',
                                    backgroundColor: '#ff9800',
                                    '&:hover': {
                                        backgroundColor: '#fda116',
                                    },
                                    '@media (max-width: 600px)': {
                                        width: '100%',
                                    }
                                }}
                                variant="contained"
                                onClick={handleRedirect}
                            >
                                <span>Adicionar</span> 
                                <span>R$ {(productPrice * count).toFixed(2)}</span>
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            ) :<Container 
            maxWidth='' 
            disableGutters={true}
            sx={{
                margin: 0,
                padding: 0,
                width: '100%',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                gap: 2,
                bottom: 0,
                height: '10%',
                padding: '20px',
                zIndex: 1000,
                boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.449)' ,// Para garantir que esteja sempre na frente de outros elementos

                // Media query para dispositivos menores
                '@media (max-width: 600px)': {
                    height: '10%', 
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center' // Altura aumentada para dispositivos menores
                }
            }}
        >
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={6} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                    '@media (max-width: 600px)': {
                        justifyContent: 'center',
                    }
                }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%' }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: '1.5rem',display:'flex',flexDirection:'column',alignItems:'flex-start', color: 'black' }}>
                       Total 
                       <Typography variant="body2" component="p" sx={{ fontSize: '1rem',display:'flex',flexDirection:'column', fontWeight: 'bold', color: '#52c5a6' , marginLeft:'2px'}}>
                            R$ {valorFinal}
                        </Typography>
                    </Typography>
                </Box>
                    
                   
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                        sx={{
                            flexDirection: 'row',
                            width: '60%',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '10px',
                            textAlign: 'center',
                            backgroundColor: '#ff9800',
                            '&:hover': {
                                backgroundColor: '#fda116',
                            },
                            '@media (max-width: 600px)': {
                                width: '100%',
                            }
                        }}
                        variant="contained"
                        onClick={handleRedirect}
                    >
                        <span>Adicionar</span> 
                        
                    </Button>
                </Grid>
            </Grid>
        </Container> }
        </>
    );
}
