import Voltar from '@/assets/voltar.png';
import { atualizarObservacao, atualizarQuantidade } from '@/lib/features/carrinho/carrinhoSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from '@mui/material';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useDispatch } from 'react-redux';

export default function ModalPagamento({
  isOpen,
  onClose,
  nomeProduto,
  imagemProduto,
  descricaoProduto,
  quanty,
  productPrice,
  initialObs,
  productId,
  index
}) {
  const [count, setCount] = useState(quanty || 1);
  const [obs, setObs] = useState(initialObs || ""); 
  const dispatch = useDispatch();
  const router = useRouter(); 

  const handleQuantidadeChange = (quantidade) => {
    setCount((prevCount) => Math.max(0, prevCount + quantidade));
  };

  const handleObsChange = (event) => {
    setObs(event.target.value);
  };

  const handleUpdate = () => {
    console.log('Atualizando quantidade e observação');
    dispatch(atualizarQuantidade({ product: { id: index }, quantity: count }));
    dispatch(atualizarObservacao({ product: { id: index }, observation: obs }));
    onClose(); 
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
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400px',
          height: '100%',
          bgcolor: '#E5E5E5',
          overflowY: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px'
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <Button
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: '#ff9800',
            color: 'white',
            zIndex: 1,
            textAlign: 'center',
            borderRadius: '4px',
            gap: 1,
            padding: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#fda116'
            }
          }}
        >
          <Image src={Voltar} width={12} height={12} alt="Voltar" />
          Voltar
        </Button>
        <Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
          <Image
            src={imagemProduto}
            width={350}
            height={250}
            alt={nomeProduto}
            style={{ borderRadius: '8px' }}
          />
        </Box>
        <Typography variant="h4" align='center' gutterBottom sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
          {nomeProduto}
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '16px' }}>
          {descricaoProduto}
        </Typography>

        <TextField
          label="Observação"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={obs}
          onChange={handleObsChange}
          sx={{ marginBottom: '16px' }}
        />

        <Box
          sx={{
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderTop: '1px solid #ddd',
            boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
            bottom: 0,
            position: 'absolute',
            left: 0,
            borderRadius: '8px',
            gap: '16px',
            backgroundColor: '#f5f5f5',
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
          <Grid container sx={{ flexGrow: 1, alignItems: 'center' }}>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl>
                <Button
                  onClick={() => handleQuantidadeChange(-1)}
                  disabled={count <= 0}
                  sx={{
                    minWidth: '50px',
                    border: 'none',
                    fontSize: '20px',
                    color: 'red'
                  }}
                >
                  <RemoveIcon sx={{ fontSize: '20px' }} />
                </Button>
              </FormControl>
              <FormControl>
                <input
                  type="number"
                  value={count}
                  readOnly
                  style={{ fontSize: '20px', width: '60px', height: '40px', textAlign: 'center', border: '1px solid #ff9800', borderRadius: '4px', margin: '0 8px' }}
                />
              </FormControl>
              <FormControl>
                <Button
                  onClick={() => handleQuantidadeChange(1)}
                  sx={{
                    minWidth: '50px',
                    border: 'none',
                    fontSize: '20px',
                    color: 'red'
                  }}
                >
                  <AddIcon sx={{ fontSize: '20px' }} />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button 
                sx={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: '10px',
                  gap: '8px',
                  textAlign: 'center',
                  backgroundColor: '#ff9800',
                  color: 'white',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#fda116'
                  }
                }}
                variant="contained"
                onClick={handleUpdate} 
              >
                <span>Atualizar</span>
                <span>R$ {(productPrice * count).toFixed(2)}</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}
