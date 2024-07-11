import React, { useState } from "react";
import { Button, Container, FormControl, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ModalPagamento from '@/components/modalpagament'

export default function BoxConfirmation({ title, message, onConfirm, onCancel, valorFinal , productImage, productName , productDescription}) {
    const [count, setCount] = useState(0);
    const [modalAberto, setModalAberto] = useState(false);

    const handleModal = () => {
        // Lógica para abrir o modal
        setModalAberto(true);
    };

    const handleQuantidadeChange = (nome, quantidade) => {
        // Adicione sua lógica aqui
    };

    return (
        <>
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
                zIndex: 1000, // Para garantir que esteja sempre na frente de outros elementos

                // Media query para dispositivos menores
                '@media (max-width: 600px)': {
                    height: '10%', 
                    display: 'flex',
                    justifyContent:'flex-start',
                    alignItems:'center'// Altura aumentada para dispositivos menores
                }
            }}
        >
            <Grid container sx={{flexGrow: 1}}>
                <Grid item xs={6} container sx={{width:'50%', display:'flex', justifyContent: 'flex-end', alignItems: 'center',order:'1px solid #ff9800'}}>
                    <FormControl>
                        <Button
                            onClick={() => handleQuantidadeChange('nome', -1)}
                            disabled={false}
                            sx={{ border: 'none' }}
                        >
                            <RemoveIcon sx={{ color: 'red', fontSize: '20px' }} />
                        </Button>
                    </FormControl>
                    <FormControl >
                        <input
                            type="number"
                            value={0}
                            readOnly
                            style={{ fontSize: '20px', width: '50px', height: '100%', textAlign: 'center', border: 'none', pointerEvents: 'none' , borderSolid: '1px #ff9800'}}
                        />
                    </FormControl>
                    <FormControl>
                        <Button sx={{ border: 'none', fontSize: '20px' }} onClick={() => handleQuantidadeChange('nome', 1)}>
                            <AddIcon sx={{ color: 'red', fontSize: '20px' }} />
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sx={{width:'50%',display: 'flex', justifyContent:'flex-end', alignItems: 'center'}}>
                    <Button
                        sx={{
                            flexDirection: 'row',
                            width: '60%',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            padding: '10px',
                            textAlign:'center',
                            backgroundColor: '#ff9800',
                            '&:hover': { // Estilo para hover
                                backgroundColor: '#fda116', // Cor para hover
                            },
                            '@media (max-width: 600px)': {
                                width: '100%', // Largura total para dispositivos menores
                                            }
                        }}
                        variant="contained"
                        onClick={handleModal}
                    >
                        <span>Adicionar</span> 
                        <span>R$ 23,00</span>
                    </Button>

                    <ModalPagamento 
                        isOpen={modalAberto} 
                        onClose={() => setModalAberto(false)} 
                        nomeProduto={productName} 
                        imagemProduto={productImage} 
                        descricaoProduto={productDescription} 
                    />
                </Grid>
            </Grid>
        </Container>
        </>
    );
}
