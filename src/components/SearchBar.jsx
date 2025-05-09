import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      // API 호출로 상품 검색
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.slice(0, 5)); // 상위 5개 결과만 표시
    } catch (error) {
      console.error('검색 오류:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const goToProduct = (id) => {
    navigate(`/products/${id}`);
    clearSearch();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <Box sx={{ position: 'relative', maxWidth: 500, mx: 'auto', mt: 2, mb: 4 }}>
      <TextField
        fullWidth
        placeholder="상품명을 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={clearSearch} edge="end">
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: 2,
            bgcolor: '#f5f5f5',
            '&:hover': { bgcolor: '#f0f0f0' },
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }
        }}
        onFocus={handleSearch}
      />

      {searchResults.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            width: '100%',
            mt: 0.5,
            zIndex: 10,
            maxHeight: 350,
            overflow: 'auto',
            borderRadius: 2,
          }}
        >
          <List>
            {searchResults.map((product) => (
              <ListItem
                button
                key={product.id}
                onClick={() => goToProduct(product.id)}
                sx={{ 
                  '&:hover': { bgcolor: '#f8f3ff' },
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={product.images[0]}
                    alt={product.title}
                    variant="rounded"
                    sx={{ width: 50, height: 50, mr: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.title}
                  secondary={`${product.price}원`}
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondaryTypographyProps={{ color: 'primary', fontWeight: 600 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {isSearching && (
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography>검색 중...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar; 