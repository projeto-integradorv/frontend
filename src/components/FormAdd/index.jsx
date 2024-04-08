import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Container, FormControl, FormGroup, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import BoxConfirmation from '../boxConfirmation';

export default function FormAdd() {
    const [selectedAdicionais, setSelectedAdicionais] = useState({});
    const [selectedCarne, setSelectedCarne] = useState('');
    const [adicionais] = useState([
        { nome: 'Alface', preco: '1.00' },
        { nome: 'Tomate', preco: '1.50' },
        { nome: 'Bacon', preco: '2.00' },
        { nome: 'Ovo', preco: '1.50' },
        { nome: 'Queijo', preco: '2.00' },
        { nome: 'Cebola', preco: '1.00' },
        { nome: 'Picles', preco: '1.00' },
        { nome: 'Molho especial', preco: '2.00' },
        { nome: 'Maionese', preco: '1.00' },
        { nome: 'Ketchup', preco: '1.00' },
        { nome: 'Mostarda', preco: '1.00' },
        { nome: 'Pão com gergelim', preco: '1.00' },
        { nome: 'Pão de forma', preco: '1.00' },
        // Adicione mais adcionais conforme necessário
    ]);

    const handleQuantidadeChange = (nome, quantidade) => {
        setSelectedAdicionais(prevState => ({
            ...prevState,
            [nome]: (prevState[nome] || 0) + quantidade
        }));
    };
    
    const handleCarneChange = (event) => {
        setSelectedCarne(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedAdicionais);
        console.log(selectedCarne);
    };

    return (
        <>
            <Container
                sx={{
                    backgroundColor: 'white',
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: 0,
                    marginRight: 15,
                    backgroundColor: "transparent",
                    marginY: -8,
                    color: 'gray',
                    gap: 2,
                    marginBottom: 20,
                    zIndex: 1000,
                    overflowY: 'auto', // Adicionando scroll invisível
                    msOverflowStyle: 'none', // Para IE e Edge
                    scrollbarWidth: 'none', // Para Firefox
                    '&::-webkit-scrollbar': {
                        display: 'none' // Para Chrome, Safari, e Opera
                    },
                    '@media (max-width: 600px)': {
                        width: '100%',
                        padding: 0,
                        marginY: 20,
                        marginRight: 0,
                    },
                }}
                disableGutters={true}
            >
                <Box
                    display={'flex'}
                    justifyContent={'flex-start'}
                    alignItems={'flex-start'}
                    padding={0}
                    width={'100%'}
                    sx={{
                        '@media (max-width: 600px)': {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Adicionais
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{ gap: 3
                    
                    }}>
                        {adicionais.map((adicional, index) => (
                            <Grid
                                key={index}
                                padding={1}
                                sx={{
                                    backgroundColor:'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: "flex-start",
                                    borderRadius: '10px',
                                    '@media (max-width: 600px)': {
                                        width: '90%',
                                        padding: 0,
                                        marginX: 3,
                                        color: "black",
                                    }
                                }}
                                container
                                spacing={1}
                                alignItems="center"
                            >
                                <Grid item padding={0} xs={6}>
                                    <Typography>{`${adicional.nome} `}
                                        <br />{`R$ ${adicional.preco}`}</Typography>
                                </Grid>
                                <Grid item xs={6}  container sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", flexWrap: 'nowrap' }} spacing={0} alignItems="center">
                                    <Grid item padding={1}>
                                        <FormControl>
                                            <Button
                                                onClick={() => handleQuantidadeChange(adicional.nome, -1)}
                                                disabled={!selectedAdicionais[adicional.nome] || selectedAdicionais[adicional.nome] <= 0}
                                                sx={{ border: "none" }}
                                            >
                                                <RemoveIcon sx={{ color: 'red', fontSize: '20px' }} />
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl>
                                            <input
                                                type="number"
                                                value={selectedAdicionais[adicional.nome] || 0}
                                                readOnly
                                                style={{ fontSize: "20px", width: '50px', height: '100%', textAlign: 'center', border: 'none', pointerEvents: 'none' }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl>
                                            <Button
                                                sx={{ border: "none", fontSize: "20px" }}
                                                onClick={() => handleQuantidadeChange(adicional.nome, 1)}
                                            >
                                                <AddIcon sx={{ color: "red", fontSize: '20px' }} />
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </FormGroup>
                </form>
            </Container>

                <BoxConfirmation />
        </>
    );
}
