'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

const ResponsiveDiv = styled.div`
  width: 49%;
  
  @media (max-width: 768px) {
    width: 74%;
  }
`;


const SearchInput = ({ placeholder, onSearch }) => {
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    onSearch(searchText);
  };

  return (
    <TextField
      label="Pesquisa"
      variant="outlined"
      sx={{ width: '100%', marginTop: '-70px',backgroundColor:'white',borderRadius:'5px'}}
      placeholder={placeholder}
      onChange={handleSearchChange}
    >
      <SearchIcon />
    </TextField>
  );
};

const useSearch = (initialValue = '') => {
  const [searchText, setSearchText] = useState(initialValue);

  const handleSearch = (text) => {
    setSearchText(text);
    // Adicione lógica adicional conforme necessário, como chamar uma API de pesquisa
  };

  return { searchText, SearchInput: <SearchInput placeholder="Qual Comida Você Está Procurando?  " onSearch={handleSearch} /> };
};

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
