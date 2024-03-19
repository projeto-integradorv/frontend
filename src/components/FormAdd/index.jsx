'use client';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Container, FormControl, FormGroup, Grid, Typography } from '@mui/material';
import { useState } from 'react';

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
        // Adicione mais adcionais conforme necessário
    ]);

    const handleQuantidadeChange = (nome) => {
        setSelectedAdicionais(prevState => ({
            ...prevState,
            [nome]: prevState[nome] === 0 ? 1 : 0
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
                marginBottom: 5,

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
                <FormGroup sx={{ gap: 3,  }}>
                    {adicionais.map((adicional, index) => (
                        <Grid padding={1} sx={{ backgroundColor:'white', display: 'flex', justifyContent: 'center', alignItems: "flex-start", borderRadius: '10px'
                        ,'@media (max-width: 600px)': {
                            width: '90%',
                            padding: 0,
                            marginX:3, 
                            color: "black",
                           
                        }}} key={index} container spacing={1} alignItems="center">
                            <Grid item padding={0} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "flex-start" }} xs={6}>
                                <Typography >{`${adicional.nome} `}
                                    <br />{`R$ ${adicional.preco}`}</Typography>
                            </Grid>
                            <Grid item xs={6}  container sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", flexWrap:'nowrap'  }} spacing={0} alignItems="center">
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
                                    </FormControl >
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                    {/* <Grid container spacing={1} alignItems="flex-start" display={"flex"} flexDirection={'column'} sx={{backgroundColor:"white", borderRadius:"10px", marginBottom:'30px'}}>
                        <Grid item padding={0} xs={6}>
                            <Typography >Tipo da Carne</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="tipo-carne"
                                    name="tipo-carne"
                                    value={selectedCarne}
                                    onChange={handleCarneChange}
                                >
                                    <FormControlLabel value="mal-passada" control={<Radio />} label="Mal Passada" />
                                    <FormControlLabel value="ao-ponto" control={<Radio />} label="Ao Ponto" />
                                    <FormControlLabel value="bem-passada" control={<Radio />} label="Bem Passada" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid> */}
                </FormGroup>
                
            </form>
        </Container>
    );
}


