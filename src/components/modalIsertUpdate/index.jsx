import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, FormControl, Chip } from '@mui/material';
import Image from "next/image";
import Voltar from '@/assets/voltar.png';
import { useDispatch, useSelector } from "react-redux";
import { editarProduto, inserirProduto } from '@/lib/features/produtos/produtoSlice';
import { carregarCategorias } from '@/lib/features/categoria/categoriaSlice';
import { carregarAdicionais } from '@/lib/features/adicionais/adicionaisSlice';
import Autocomplete from '@mui/material/Autocomplete';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ModalProduto({ isOpen, onClose, produto }) {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias.categorias || []); // Verificação de array vazio
  const adicionaisDisponiveis = useSelector((state) => state.adicionais.adicionais || []); // Verificação de array vazio

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);
  const [imagemPreview, setImagemPreview] = useState('');
  const [imagem, setImagem] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [adicionais, setAdicionais] = useState([]);

  useEffect(() => {
    if (produto) {
      setNome(produto.name || '');
      setDescricao(produto.description || '');
      setPreco(produto.price || 0);
      setImagemPreview(produto.image || '');
      setCategoria(produto.category || null);
      setAdicionais(produto.additionals || []);
    } else {
      setNome('');
      setDescricao('');
      setPreco(0);
      setImagemPreview('');
      setImagem(null);
      setCategoria(null);
      setAdicionais([]);
    }
  }, [produto]);

  useEffect(() => {
    if (categorias.length === 0) {
      dispatch(carregarCategorias());
    }
    if (adicionaisDisponiveis.length === 0) {
      dispatch(carregarAdicionais());
    }
  }, [categorias, adicionaisDisponiveis, dispatch]);

  useEffect(() => {
    return () => {
      if (imagemPreview) {
        URL.revokeObjectURL(imagemPreview);
      }
    };
  }, [imagemPreview]);

  const handleNomeChange = (e) => setNome(e.target.value);
  const handleDescricaoChange = (e) => setDescricao(e.target.value);
  const handlePrecoChange = (e) => setPreco(parseFloat(e.target.value) || 0);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagem(file);
      setImagemPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleCategoriaChange = (event, newValue) => {
    const categoriaSelecionada = categorias.find(cat => cat.name === newValue);
    setCategoria(categoriaSelecionada ? categoriaSelecionada.id : null);
  };

  const handleAdicionalChange = (event, newValue) => {
    const adicionaisSelecionados = newValue.map(adicional => {
      const adicionalEncontrado = adicionaisDisponiveis.find(adc => adc.name === adicional);
      return adicionalEncontrado ? adicionalEncontrado.id : null;
    }).filter(id => id !== null);
    setAdicionais(adicionaisSelecionados);
  };

  const removerAdicional = (adicionalId) => {
    setAdicionais((prev) => prev.filter(id => id !== adicionalId));
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("name", nome);
    formData.append("description", descricao);
    formData.append("price", preco.toString());
    formData.append("category", categoria || '');

    adicionais.forEach((adicional) => {
      formData.append("additionals", adicional);
    });

    if (imagem) {
      formData.append("image", imagem);
    }

    if (produto) {
      formData.append("id", produto.id);
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
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={nome}
            onChange={handleNomeChange}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={descricao}
            onChange={handleDescricaoChange}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            type="number"
            value={preco}
            onChange={handlePrecoChange}
            sx={{ marginBottom: '16px' }}
          />
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <Autocomplete
              value={categorias.find(cat => cat.id === categoria)?.name || ''}
              onChange={handleCategoriaChange}
              options={categorias.map((cat) => cat.name)}
              renderInput={(params) => <TextField {...params} label="Categoria" variant="outlined" />}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <Autocomplete
              multiple
              value={adicionais.map(id => adicionaisDisponiveis.find(adc => adc.id === id)?.name || '')}
              onChange={handleAdicionalChange}
              options={adicionaisDisponiveis.map((adc) => adc.name)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    {...getTagProps({ index })}
                    onDelete={() => removerAdicional(adicionaisDisponiveis.find(adc => adc.name === option)?.id)}
                  />
                ))
              }
              renderInput={(params) => <TextField {...params} label="Adicionais" variant="outlined" />}
            />
          </FormControl>
        </Box>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 'auto', padding: '12px' }}
        >
          {produto ? 'Atualizar Produto' : 'Inserir Produto'}
        </Button>
      </Box>
    </Modal>
  );
}
