'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

// Define a paleta de cores e o tema
const themeColors = {
  primary: '#1976d2', // Cor principal
  background: '#ffffff', // Cor de fundo
  border: '#e0e0e0', // Cor da borda
  borderFocus: '#1976d2', // Cor da borda quando em foco
};

// Estilo do container responsivo
const ResponsiveDiv = styled.div`
  max-width: 800px; // largura máxima para manter a leitura confortável
  width: 100%;
  margin: 0 auto; // centraliza o div
  padding: 20px; // espaçamento interno
  box-sizing: border-box; // inclui padding e border no cálculo da largura
`;

// Estilo do TextField
const StyledTextField = styled(TextField)`
  width: 100%;
  background-color: ${themeColors.background}; // cor de fundo branca
  border-radius: 4px; // bordas arredondadas
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // sombra sutil
  margin-top: 20px; // adiciona espaçamento superior
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${themeColors.border}; // cor da borda
    }
    &:hover fieldset {
      border-color: ${themeColors.primary}; // cor da borda ao passar o mouse
    }
    &.Mui-focused fieldset {
      border-color: ${themeColors.primary}; // cor da borda em foco
    }
  }
`;

// Componente de Input de Pesquisa
const SearchInput = ({ placeholder, onSearch }) => {
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    onSearch(searchText);
  };

  return (
    <StyledTextField
      label="Pesquisa"
      variant="outlined"
      placeholder={placeholder}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      aria-label="Pesquisar" // Adiciona acessibilidade
    />
  );
};

// Hook de Pesquisa
const useSearch = (initialValue = '') => {
  const [searchText, setSearchText] = useState(initialValue);

  const handleSearch = (text) => {
    setSearchText(text);
    // Adicione lógica adicional conforme necessário, como chamar uma API de pesquisa
  };

  return { searchText, SearchInput: <SearchInput placeholder="Qual comida você está procurando?" onSearch={handleSearch} /> };
};

// Componente Principal de Pesquisa
const Search = () => {
  const { searchText, SearchInput } = useSearch();

  return (
    <ResponsiveDiv>
      {SearchInput}
      {/* Restante do seu componente */}
    </ResponsiveDiv>
  );
};

export default Search;
