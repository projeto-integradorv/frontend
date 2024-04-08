import React, { useState } from 'react';
import { Box, Container, Button, Grid, FormControl } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function BoxConfirmation({ title, message, onConfirm, onCancel }) {
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
            sx={{
                width: '100%',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                bottom: 0,
                height: '14%',
                padding: '20px',
                zIndex: 1000, // Para garantir que esteja sempre na frente de outros elementos
            }}
        >
            <Grid item xs={6} container sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'nowrap' }} spacing={0} alignItems="center">
                <Grid item padding={1}>
                    <FormControl>
                        <Button
                            onClick={() => handleQuantidadeChange('nome', -1)}
                            disabled={false}
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
                            value={0}
                            readOnly
                            style={{ fontSize: '20px', width: '50px', height: '100%', textAlign: 'center', border: 'none', pointerEvents: 'none' }}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <Button sx={{ border: 'none', fontSize: '20px' }} onClick={() => handleQuantidadeChange('nome', 1)}>
                            <AddIcon sx={{ color: 'red', fontSize: '20px' }} />
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
            <Button variant="contained" onClick={handleDownload}>
                Baixar
            </Button>
        </Container>
    );
}
