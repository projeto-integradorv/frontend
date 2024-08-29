'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

const themeColors = {
  primary: '#1976d2',
  background: '#ffffff', 
  border: '#e0e0e0', 
  borderFocus: '#1976d2', 
};
const ResponsiveDiv = styled.div`
  max-width: 800px; 
  width: 100%;
  margin: 0 auto; 
  padding: 20px; 
  box-sizing: border-box; 
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  background-color: ${themeColors.background}; 
  border-radius: 4px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  margin-top: 20px; 
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${themeColors.border}; 
    }
    &:hover fieldset {
      border-color: ${themeColors.primary}; 
    &.Mui-focused fieldset {
      border-color: ${themeColors.primary}; 
    }
  }}`;

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
      aria-label="Pesquisar" 
    />
  );
};

const useSearch = (initialValue = '') => {
  const [searchText, setSearchText] = useState(initialValue);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return { searchText, SearchInput: <SearchInput placeholder="Qual comida você está procurando?" onSearch={handleSearch} /> };
};

const Search = () => {
  const { searchText, SearchInput } = useSearch();

  return (
    <ResponsiveDiv>
      {SearchInput}
    </ResponsiveDiv>
  );
};

export default Search;
