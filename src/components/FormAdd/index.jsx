import { Box, Button, CircularProgress, Container, FormControl, FormGroup, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import BoxConfirmation from '../boxConfirmation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getProductById } from '@/api/product';
import Hamburguer from '@/assets/x-bacon.jpeg';

export default function FormAdd({ productId }) {
    const [selectedAdicionais, setSelectedAdicionais] = useState({});
    const [selectedCarne, setSelectedCarne] = useState('');
    const [adicionais, setAdicionais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // Estado para armazenar o preço total

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId);
                setFoods(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao obter o produto por ID:", error);
            }
        };
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        // Simulando uma requisição assíncrona para buscar os adicionais
        const fetchAdicionais = async () => {
            try {
                // Simulação de uma requisição assíncrona para buscar os adicionais
                const data = [
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
                ];

                // Espera 1 segundo para simular o tempo de carregamento
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Define os adicionais
                setAdicionais(data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao obter os adicionais:", error);
            }
        };

        fetchAdicionais();
    }, []);

    const handleQuantidadeChange = (nome, quantidade) => {
        setSelectedAdicionais(prevState => ({
            ...prevState,
            [nome]: (prevState[nome] || 0) + quantidade
        }));
    };

    const handleCarneChange = (event) => {
        setSelectedCarne(event.target.value);
    };

    const calculateTotalPrice = () => {
        let total = parseFloat(foods.price) || 0; // Começa com o preço base do produto

        // Verifica se há adicionais selecionados
        const hasAdicionaisSelecionados = Object.keys(selectedAdicionais).some(adicional => selectedAdicionais[adicional] > 0);

        // Se houver adicionais selecionados, adiciona seus preços ao total
        if (hasAdicionaisSelecionados) {
            Object.keys(selectedAdicionais).forEach(adicional => {
                if (selectedAdicionais[adicional] > 0) {
                    const adicionalPrice = parseFloat(adicionais.find(a => a.nome === adicional)?.preco) || 0;
                    total += adicionalPrice * selectedAdicionais[adicional];
                }
               
            });
        }

        // Adiciona o preço da carne selecionada, se houver
        if (selectedCarne) {
            total += parseFloat(selectedCarne); // Assumindo que selectedCarne já contém o preço da carne
        }

        setTotalPrice(total);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedAdicionais, selectedCarne]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedAdicionais);
        console.log(selectedCarne);
    };

    return (
        <>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
                    <CircularProgress sx={{color:'#FF9800'}}/>
                </Box>
            ) : (
                <Container
                    sx={{
                        backgroundColor: 'white',
                        width: '50%',
                        height: 'fit-content',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 0,
                        marginRight: 13,
                        backgroundColor: "transparent",
                        marginY: -8,
                        color: 'gray',
                        gap: 2,
                        marginBottom: 20,
                       
                       
                        '@media (max-width: 600px)': {
                            width: '100%',
                            padding: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
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
                        <FormGroup sx={{ gap: 3 }}>
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
                                            width: '100%',
                                            padding: "10px",
                                            color: "black",
                                        }
                                    }}
                                    container
                                    alignItems="center"
                                >
                                    <Grid item padding={0} xs={6}>
                                        <Typography>{`${adicional.nome} `}<br />{`R$ ${adicional.preco}`}</Typography>
                                    </Grid>
                                    <Grid item xs={6} container sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", flexWrap: 'nowrap' }} spacing={0} alignItems="center">
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
            )}
            <BoxConfirmation
                productPrice={totalPrice || foods.price || 0}
                productImage={foods.image || Hamburguer}
                productName={foods.name || ''}
                productDescription={foods.description || ''}
            />
        </>
    );
}
