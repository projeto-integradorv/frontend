import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, FormControl, Select, MenuItem, InputLabel, Chip } from '@mui/material';
import Image from "next/image";
import Voltar from '@/assets/voltar.png';
import { useDispatch } from "react-redux";
import { editarProduto, inserirProduto } from '@/lib/features/produtos/produtoSlice';
import RemoveIcon from '@mui/icons-material/Remove';
const categoriasMock = ['Eletrônicos', 'Roupas', 'Alimentos', 'Casa e Jardim', 'Beleza'];

export default function ModalProduto({ isOpen, onClose, produto }) {
  const [nome, setNome] = useState(produto?.name || '');
  const [descricao, setDescricao] = useState(produto?.description || '');
  const [preco, setPreco] = useState(produto?.price || 0);
  const [imagemPreview, setImagemPreview] = useState(produto?.image || '');
  const [imagem, setImagem] = useState(null);
  const [categoria, setCategoria] = useState(produto?.category || categoriasMock[0]);
  const [adicionais, setAdicionais] = useState(produto?.adicionais || []);
  const [novoAdicional, setNovoAdicional] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (produto) {
      setNome(produto.name);
      setDescricao(produto.description);
      setPreco(produto.price);
      setImagemPreview(produto.image);
      setCategoria(produto.category);
      setAdicionais(produto.adicionais || []);
    }
  }, [produto]);

  const handleNomeChange = (e) => setNome(e.target.value);
  const handleDescricaoChange = (e) => setDescricao(e.target.value);
  const handlePrecoChange = (e) => setPreco(parseFloat(e.target.value) || 0);
  const handleCategoriaChange = (e) => setCategoria(e.target.value);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagem(file);
      setImagemPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleNovoAdicionalChange = (e) => setNovoAdicional(e.target.value);

  const adicionarAdicional = () => {
    if (novoAdicional) {
      setAdicionais((prev) => [...prev, novoAdicional]);
      setNovoAdicional('');
    }
  };

  const removerAdicional = (adicionalParaRemover) => {
    setAdicionais((prev) => prev.filter(adicional => adicional !== adicionalParaRemover));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", nome);
    formData.append("description", descricao);
    formData.append("price", preco.toString()); // Certifique-se de enviar como string
    formData.append("category", categoria);
    formData.append("adicionais", JSON.stringify(adicionais)); // Serializa os adicionais
    
    if (imagem) {
      formData.append("image", imagem);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    if (produto) {
      console.log('Editando produto:', produto.id);
      formData.append("id", produto.id); // Adiciona o ID para a edição
      dispatch(editarProduto(formData));
    } else {
      dispatch(inserirProduto(formData));
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
            {produto ? 'Atualizar Produto' : 'Novo Produto'}
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
            <InputLabel>Categoria</InputLabel>
            <Select
              value={categoria}
              onChange={handleCategoriaChange}
              label="Categoria"
            >
              {categoriasMock.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <TextField
              label="Nome do Produto"
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
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <TextField
              label="Preço (R$)"
              value={preco}
              onChange={handlePrecoChange}
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <TextField
              label="Novo Adicional"
              value={novoAdicional}
              onChange={handleNovoAdicionalChange}
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    onClick={adicionarAdicional}
                    sx={{ marginLeft: '8px' }}
                  >
                    Adicionar
                  </Button>
                ),
              }}
            />
          </FormControl>
          <Box>
            {adicionais.map((adicional, index) => (
              <Chip
                key={index}
                label={adicional}
                onDelete={() => removerAdicional(adicional)}
                deleteIcon={<RemoveIcon />}
                sx={{ marginRight: '8px', marginBottom: '8px' }}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ marginTop: '16px' }}
          >
            {produto ? 'Atualizar Produto' : 'Adicionar Produto'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
