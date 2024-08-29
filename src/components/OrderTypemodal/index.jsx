import React, { useState } from 'react';
import { Modal, Box, Typography, FormControl, MenuItem, Select, Button } from '@mui/material';

const ORDER_TYPE_CHOICES = [
    { value: 'Mesa', label: 'Mesa' },
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Retirada', label: 'Retirada na Loja' }
];

const PAYMENT_TYPE_CHOICES = [
    { value: 'Dinheiro', label: 'Dinheiro' },
    { value: 'Cartão de Crédito', label: 'Cartão de Crédito' },
    { value: 'Cartão de Débito', label: 'Cartão de Débito' },
    { value: 'Pix', label: 'Pix' }
];

export default function OrderTypeModal({ open, onClose, onConfirm }) {
    const [orderType, setOrderType] = useState(ORDER_TYPE_CHOICES[0].value);
    const [paymentType, setPaymentType] = useState(PAYMENT_TYPE_CHOICES[0].value);

    const handleConfirm = () => {
        onConfirm(orderType, paymentType);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                width: '300px',
                padding: '16px',
                backgroundColor: 'white',
                margin: 'auto',
                marginTop: '20vh',
                borderRadius: '8px',
                boxShadow: 24
            }}>
                <Typography variant="h6">Escolha as opções do pedido</Typography>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <Typography variant="body1">Tipo de Pedido</Typography>
                    <Select
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                    >
                        {ORDER_TYPE_CHOICES.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <Typography variant="body1">Tipo de Pagamento</Typography>
                    <Select
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    >
                        {PAYMENT_TYPE_CHOICES.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handleConfirm}
                >
                    Confirmar
                </Button>
            </Box>
        </Modal>
    );
}
