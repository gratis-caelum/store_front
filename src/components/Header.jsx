import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: '상품', path: '/products' },
  { label: '로그인', path: '/login' },
  { label: '회원가입', path: '/register' },
];

export default function Header() {
  const location = useLocation();
  // 장바구니 수량은 추후 상태 연동, 지금은 0으로 표시
  const cartCount = 0;

  return (
    <AppBar position="fixed" color="primary" elevation={2}>
      <Toolbar>
        <StorefrontIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            letterSpacing: 1.5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          쇼핑몰
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color={location.pathname === item.path ? 'secondary' : 'inherit'}
              sx={{
                fontWeight: location.pathname === item.path ? 700 : 400,
                borderBottom: location.pathname === item.path ? '2px solid #fff' : 'none',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 