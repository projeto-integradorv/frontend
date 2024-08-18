import React, { useState } from "react";
import { Button, Modal, Box, Typography, TextField, FormControl } from '@mui/material';
import Image from "next/image";
import Voltar from '@/assets/voltar.png';
import { useDispatch } from "react-redux";
import { inserirCategoria, atualizarCategoria } from '@/lib/features/categoria/categoriaSlice';

export default function ModalCategoria({ isOpen, onClose, categoria }) {
  const [nome, setNome] = useState(categoria?.name || '');
  const [descricao, setDescricao] = useState(categoria?.description || '');
  const [imagemPreview, setImagemPreview] = useState(categoria?.image || '');
  const [imagem, setImagem] = useState(null);

  const dispatch = useDispatch();

  const handleNomeChange = (e) => setNome(e.target.value);
  const handleDescricaoChange = (e) => setDescricao(e.target.value);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagem(file);
      setImagemPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
  
    formData.append("description", descricao);
    formData.append("name", nome);
    formData.append("category", categoria || ''); 
    if (imagem) {
      formData.append("image", imagem);
    }
  
    if (categoria) {
      formData.append("id", categoria.id);
      dispatch(atualizarCategoria(formData));
    } else {
      dispatch(inserirCategoria(formData));
    }
  
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
          padding: '16px',
          '@media (max-width: 600px)': {
            width: '100%',
            height: '100%',
          }
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
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            marginTop: '40px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h4" align='center' gutterBottom sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
            {categoria ? 'Atualizar Categoria' : 'Nova Categoria'}
          </Typography>
          <Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
            <Box 
              sx={{
                width: '100%',
                height: '250px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: '16px'
              }}
            >
              {imagemPreview ? (
                <Image
                  src={imagemPreview}
                  width={350}
                  height={250}
                  alt={nome}
                  style={{ borderRadius: '8px' }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Nenhuma imagem carregada
                </Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              component="label"
              sx={{ marginTop: '16px' }}
            >
              Carregar Imagem
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImagemChange}
              />
            </Button>
          </Box>
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <TextField
              label="Nome da Categoria"
              value={nome}
              onChange={handleNomeChange}
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <TextField
              label="Descrição"
              value={descricao}
              onChange={handleDescricaoChange}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
            />
          </FormControl>
        </Box>
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
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
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
            onClick={handleSubmit}
          >
            <span>{categoria ? 'Atualizar' : 'Adicionar'}</span>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
