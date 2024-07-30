import React, { useState } from "react";
import { Button, Container, Grid, Modal, Box, Typography, FormControl } from '@mui/material';
import Image from "next/image";
import Voltar from '@/assets/voltar.png';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function ModalPagamento({
  isOpen,
  onClose,
  nomeProduto,
  imagemProduto,
  descricaoProduto,
  quanty,
  handleRedirect,
  productPrice
}) {

  const[count, setCount] = useState(quanty || 1);

  const handleQuantidadeChange = (quantidade) => {
    setCount((prevCount) => Math.max(0, prevCount + quantidade));
};
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      slotProps={{
        backdrop: {
          onClick: onClose
        }
      }}
        
    >
      <Box
        margin={0}
        padding={0}
        sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '400px',
          height: '100%',
          bgcolor: '#E5E5E5',
          overflow: 'auto', // Ensure content scrolls if it overflows
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside Box from closing the modal
      >
        <Container maxWidth='' disableGutters={true} sx={{ margin: 0 }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} width={'100%'}>
              <Button
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  gap: 1,
                  top: '10px',
                  left: '10px',
                  backgroundColor: 'orange',
                  color: 'white',
                  zIndex: 1
                }}
              >
                <Image src={Voltar} width={8} />
                Voltar
              </Button>
              <div style={{ width: '100%', marginBottom: 10 }}>
                <Image
                  width={400}
                  height={300}
                  src={imagemProduto}
                />
              </div>
              <Typography sx={{ marginLeft: 3 }} variant="h4" align='left' gutterBottom>
                {nomeProduto}
              </Typography>
              <Typography sx={{ marginLeft: 3 }} variant="body1" align="left">
                {descricaoProduto}
              </Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Container Adicionado na Parte Inferior */}
        <Container
          maxWidth=''
          disableGutters={true}
          sx={{
            margin: 0,
            padding: 0,
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            gap: 2,
            bottom: 0,
            height: '10%',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.449)', // Para garantir que esteja sempre na frente de outros elementos

            // Media query para dispositivos menores
            '@media (max-width: 600px)': {
              height: '10%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center' // Altura aumentada para dispositivos menores
            }
          }}
        >
          <Grid container sx={{ flexGrow: 1 }}>
            <Grid
              item
              xs={5}
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                '@media (max-width: 600px)': {
                  justifyContent: 'center',
                }
              }}
            >
              <FormControl>
                <Button
                  onClick={() => handleQuantidadeChange(-1)}
                  disabled={count <= 0}
                  sx={{ border: 'none', minWidth: '50px', fontSize: '20px' }}
                >
                  <RemoveIcon sx={{ color: 'red', fontSize: '20px' }} />
                </Button>
              </FormControl>
              <FormControl>
                <input
                  type="number"
                  value={count}
                  readOnly
                  style={{ fontSize: '20px', width: '50px', height: '100%', textAlign: 'center', border: 'none', pointerEvents: 'none', borderSolid: '1px #ff9800' }}
                />
              </FormControl>
              <FormControl>
                <Button
                  sx={{ border: 'none', minWidth: '50px', fontSize: '20px' }}
                  onClick={() => handleQuantidadeChange(1)}
                >
                  <AddIcon sx={{ color: 'red', fontSize: '20px' }} />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button 
                sx={{
                  flexDirection: 'row',
                  width: '80%',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  padding: '10px',
                  textAlign: 'center',
                  backgroundColor: '#ff9800',
                  '&:hover': {
                    backgroundColor: '#fda116',
                  }
                }}
                variant="contained"
                onClick={handleRedirect}
              >
                <span>Atualizar</span>
                <span>R$ {productPrice * count}</span>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}
