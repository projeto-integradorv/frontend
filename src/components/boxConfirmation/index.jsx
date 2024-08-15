import React, { useState } from "react";
import { Box, Button, FormControl, Grid, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { adicionarAoCarrinho } from '@/lib/features/carrinho/carrinhoSlice';

export default function BoxConfirmation({
  title,
  Additional,
  message,
  onConfirm,
  onCancel,
  valorFinal,
  productImage,
  productName,
  productDescription,
  productPrice,
  quantity,
  productId
}) {
  const [count, setCount] = useState(1);
  const [observation, setObservation] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleQuantidadeChange = (quantidade) => {
    setCount((prevCount) => Math.max(1, prevCount + quantidade));
  };

  const handleRedirect = () => {
    router.push('/cart');
  };

  const handleAddToCart = () => {
    if (productId) {
      const item = {
        product: {
          id: productId,
          name: productName,
          description: productDescription,
          image: productImage,
          price: productPrice
        },
        quantity: count,
        observation: observation, // Inclui a observação
        additionals: [] 
      };
      
      dispatch(adicionarAoCarrinho(item));
      handleRedirect(); 
    }
  };

  return (
    <Box
      disableGutters
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        padding: '16px',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderTop: '1px solid #ddd',
        zIndex: 1000,
        '@media (max-width: 600px)': {
          padding: '12px',
          height: 'auto',
        },
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: '1200px', flexGrow: 1, alignItems: 'center' }}>
        {productId ? (
          <>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                label="Observações"
                variant="outlined"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Adicione alguma observação (ex: sem cebola, mais molho, etc.)"
              />
            </Grid>
            <Grid item xs={6} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <FormControl>
                <Button
                  onClick={() => handleQuantidadeChange(-1)}
                  disabled={count <= 1}
                  sx={{
                    minWidth: '40px',
                    fontSize: '18px',
                    color: '#ff9800',
                    '&:disabled': { color: '#bdbdbd' }
                  }}
                >
                  <RemoveIcon />
                </Button>
              </FormControl>
              <FormControl>
                <input
                  type="number"
                  value={count}
                  readOnly
                  style={{
                    fontSize: '18px',
                    width: '60px',
                    textAlign: 'center',
                    border: '1px solid #ff9800',
                    borderRadius: '4px',
                    margin: '0 8px',
                    padding: '4px',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                  }}
                />
              </FormControl>
              <FormControl>
                <Button
                  onClick={() => handleQuantidadeChange(1)}
                  sx={{
                    minWidth: '40px',
                    fontSize: '18px',
                    color: '#ff9800'
                  }}
                >
                  <AddIcon />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button
                sx={{
                  flexDirection: 'row',
                  width: '60%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: '#ff9800',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#fda116',
                  },
                  borderRadius: '8px',
                  fontSize: '16px',
                  '@media (max-width: 600px)': {
                    width: '100%',
                    fontSize: '14px',
                  }
                }}
                variant="contained"
                onClick={handleAddToCart}
              >
                <span>Adicionar</span>
                <span>R$ {(productPrice * count).toFixed(2)}</span>
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="h2" sx={{ fontSize: '1.5rem', color: 'black' }}>
                  Total
                  <Typography variant="body2" component="p" sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#52c5a6', marginTop: '4px' }}>
                    R$ {valorFinal}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button
                sx={{
                  flexDirection: 'row',
                  width: '60%',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: '#ff9800',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#fda116',
                  },
                  borderRadius: '8px',
                  fontSize: '16px',
                  '@media (max-width: 600px)': {
                    width: '100%',
                    fontSize: '14px',
                  }
                }}
                variant="contained"
                onClick={handleRedirect}
              >
                Confirmar
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
