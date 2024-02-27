'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

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
    <div style={{width:'49%'}}>
      {SearchInput}
      {/* Restante do seu componente */}
    </div>
  );
};

export default Search;
