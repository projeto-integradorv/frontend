import React from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Navbar() {
    return (
        <nav style={{ width: '100%', backgroundColor: '#FF9800', height: '100%' }}>
            <Container sx={{ display: 'flex'}} disableGutters={true} >
                <Box
                    width={'50%'}
                    display='flex'
                    alignItems='center' 
                    justifyContent='flex-start'> 
                    <Button sx={{ color: 'white' }} >
                        <span> </span> Voltar
                    </Button>
                </Box>
                <Box
                    width={'50%'}
                    display='flex'
                    alignItems='flex-end'
                    justifyContent='flex-end'
                    gap={4}>

                    <Button sx={{ color: 'white' }}>
                        Cardápio
                    </Button>
                    <Button sx={{ color: 'white' }}>
                        Pedidos
                    </Button>
                </Box>
            </Container>
        </nav>
    );
}
