import { Box, Button, CircularProgress, Container, FormControl, FormGroup, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import BoxConfirmation from '../boxConfirmation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Hamburguer from '@/assets/x-bacon.jpeg';
import PropTypes from 'prop-types';

export default function FormAdd({ produto }) {
    const [selectedAdicionais, setSelectedAdicionais] = useState([]);
    const [selectedCarne, setSelectedCarne] = useState('');
    const [adicionais, setAdicionais] = useState([]);
    const [loading, setLoading] = useState(false);
    const [foods, setFoods] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantidade, setQuantidade] = useState(1);

    useEffect(() => {
        if (produto && produto.additionals) {
            setFoods(produto);
            setAdicionais(produto.additionals);
        }
    }, [produto]);

    const handleQuantidadeChange = (id, name, quantity) => {
        setSelectedAdicionais((prevState) => {
            const updatedAdicionais = [...prevState];
            const index = updatedAdicionais.findIndex(adicional => adicional.additional === id);

            if (index !== -1) {
                updatedAdicionais[index].quantity += quantity;
                if (updatedAdicionais[index].quantity <= 0) {
                    updatedAdicionais.splice(index, 1);
                }
            } else if (quantity > 0) {
                updatedAdicionais.push({ additional: id, name, quantity });
            }

            return updatedAdicionais;
        });
    };

    const calculateTotalPrice = () => {
        let total = parseFloat(foods.price) || 0;

        selectedAdicionais.forEach(adicional => {
            const adicionalData = adicionais.find(a => a.id === adicional.additional);
            const price = adicionalData ? parseFloat(adicionalData.price) : 0;
            total += price * adicional.quantity;
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
                        marginBottom: 30,
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
                                                    onClick={() => handleQuantidadeChange(adicional.id, adicional.name, -1)}
                                                    disabled={
                                                        !selectedAdicionais.find(a => a.additional === adicional.id) ||
                                                        selectedAdicionais.find(a => a.additional === adicional.id)?.quantity <= 0
                                                    }
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
                                                    value={
                                                        selectedAdicionais.find(a => a.additional === adicional.id)?.quantity || 0
                                                    }
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
                                                    onClick={() => handleQuantidadeChange(adicional.id, adicional.name, 1)}
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
                productId={produto}
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
    produto: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
        additionals: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
        })),
    }),
};
