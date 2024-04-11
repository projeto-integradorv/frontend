import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Container, FormControl, Grid } from '@mui/material';
import { useState } from 'react';

export default function BoxConfirmation({ title, message, onConfirm, onCancel, valorFinal }) {
    const [count, setCount] = useState(0);

    const handleDownload = () => {
        // Coloque aqui a lógica para o download
        console.log('Arquivo baixado!');
    };

    const handleQuantidadeChange = (nome, quantidade) => {
        // Adicione sua lógica aqui
    };

    return (
        <Container 
            maxWidth='' 
            disableGutters={true}
            sx={{
                margin: 0,
                padding: 0,
                width: '100%',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'flex-end',
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
                <Grid item xs={9} container sx={{ justifyContent: 'flex-end', alignItems: 'center',order:'1px solid #ff9800'}}>
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
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Button
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: '#ff9800',
                            '&:hover': { // Estilo para hover
                                backgroundColor: '#ffcc80', // Cor para hover
                            }
                        }}
                        variant="contained"
                        onClick={handleDownload}
                    >
                        <span>Adicionar</span>
                        <span>R$ 23,00</span>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
