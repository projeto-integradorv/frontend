import { Box, Button, CircularProgress, Container, FormControl, FormGroup, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import BoxConfirmation from '../boxConfirmation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getProductById } from '@/api/product';
import Hamburguer from '@/assets/x-bacon.jpeg';
import PropTypes from 'prop-types';

export default function FormAdd({ productId }) {
    const [selectedAdicionais, setSelectedAdicionais] = useState({});
    const [selectedCarne, setSelectedCarne] = useState('');
    const [adicionais, setAdicionais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantidade, setQuantidade] = useState(1);


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
        const fetchAdicionais = async () => {
            try {
                const response = await getProductById(productId);
                setAdicionais(response.data.additionals);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao obter os adicionais do produto:", error);
            }
        };

        fetchAdicionais();
    }, [productId]);

    const handleQuantidadeChange = (name, quantity) => {
        setSelectedAdicionais(prevState => ({
            ...prevState,
            [name]: (prevState[name] || 0) + quantity
        }));

        setQuantidade(quantity);
    };

    const calculateTotalPrice = () => {
        let total = parseFloat(foods.price) || 0;

        Object.keys(selectedAdicionais).forEach(name => {
            if (selectedAdicionais[name] > 0) {
                const adicional = adicionais.find(a => a.name === name);
                const price = adicional ? parseFloat(adicional.price) : 0;
                total += price * selectedAdicionais[name];
            }
        });

        if (selectedCarne) {
            total += parseFloat(selectedCarne);
        }

        setTotalPrice(total);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedAdicionais, selectedCarne]);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
                    <CircularProgress sx={{ color: '#FF9800' }} />
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
                                    container
                                    sx={{
                                        backgroundColor: 'white',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        borderRadius: '10px',
                                        '@media (max-width: 600px)': {
                                            width: '100%',
                                            padding: '10px',
                                            color: 'black',
                                        },
                                    }}
                                >
                                    <Grid item xs={6} padding={0}>
                                        <Typography>
                                            {adicional.name ? adicional.name : 'Nome não disponível'}
                                            <br />
                                            {adicional.price !== undefined ? `R$ ${adicional.price}` : 'Preço não disponível'}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        container
                                        spacing={0}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            flexWrap: 'nowrap',
                                        }}
                                    >
                                        <Grid item padding={1}>
                                            <FormControl>
                                                <Button
                                                    onClick={() => handleQuantidadeChange(adicional.name, -1)}
                                                    disabled={!selectedAdicionais[adicional.name] || selectedAdicionais[adicional.name] <= 0}
                                                    sx={{ border: 'none' }}
                                                >
                                                    <RemoveIcon sx={{ color: 'red', fontSize: '20px' }} />
                                                </Button>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <FormControl>
                                                <input
                                                    type="number"
                                                    value={selectedAdicionais[adicional.name] || 0}
                                                    readOnly
                                                    style={{
                                                        fontSize: '20px',
                                                        width: '50px',
                                                        height: '100%',
                                                        textAlign: 'center',
                                                        border: 'none',
                                                        pointerEvents: 'none',
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <FormControl>
                                                <Button
                                                    onClick={() => handleQuantidadeChange(adicional.name, 1)}
                                                    sx={{ border: 'none', fontSize: '20px' }}
                                                >
                                                    <AddIcon sx={{ color: 'red', fontSize: '20px' }} />
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
                productId={productId}
                Additional={selectedAdicionais}
                productPrice={totalPrice || foods.price || 0}
                productImage={foods.image || Hamburguer}
                valorFinal={totalPrice}
                productName={foods.name || ''}
                quantity={quantidade}
                productDescription={foods.description || ''}
            />
        </>
    );
}

FormAdd.propTypes = {
    productId: PropTypes.string,
};