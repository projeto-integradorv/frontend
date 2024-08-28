import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function OrderCard({ order, onClick }) {
    return (
        <Card 
            sx={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'row', 
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                marginBottom: '16px',
                overflow: 'hidden',
                '&:hover': {
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
                },
                cursor: 'pointer'
            }}
            onClick={() => onClick(order)}
        >
            <CardContent sx={{ 
                display: 'flex', 
                width: '100%', 
                flexDirection: 'row', 
                padding: '16px',
                gap: '16px'
            }}>
                <Box sx={{ 
                    width: '50%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px'
                }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Pedido #{order.id}
                    </Typography>
                    <Typography variant='body2' sx={{ color: '#555' }}>
                        Total 
                    </Typography>
                    <Typography variant='body2' sx={{ color: '#555' }}>
                        Status
                    </Typography>
                </Box>
                <Box sx={{ 
                    width: '50%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-end', 
                    gap: '8px'
                }}>
                    <Typography variant="body2" component="p" sx={{ fontSize: '1rem' }}>
                        Qtd: {order.quantidade}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ color: '#52c5a6', fontSize: '1rem', fontWeight: 'bold' }}>
                        R$ {order.total_price}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ color: '#333' }}>
                        {order.order_status}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
