import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, changeQuantity } from '../store';
import Toast from '../components/Toast';
import { useNavigate } from 'react-router-dom';

// 임시 더미 데이터
const cartItems = [
  {
    id: 1,
    title: 'Classic Red Pullover Hoodie',
    price: 100000,
    image: 'https://api.lorem.space/image/fashion?w=400&h=400&r=1',
    quantity: 2,
  },
  {
    id: 2,
    title: 'Classic Grey Hooded Sweatshirt',
    price: 97000,
    image: 'https://api.lorem.space/image/fashion?w=400&h=400&r=2',
    quantity: 1,
  },
];

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleChangeQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(changeQuantity({ id, quantity }));
      setToast({ open: true, message: '수량이 변경되었습니다.', severity: 'info' });
    }
  };
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setToast({ open: true, message: '장바구니에서 삭제되었습니다.', severity: 'warning' });
  };

  return (
    <>
      <Box sx={{ marginTop: 10, maxWidth: 800, mx: 'auto', p: { xs: 1, sm: 3 }, background: '#f9f9f9', minHeight: '80vh', pb: 8 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 4, textAlign: 'center', color: 'primary.main', letterSpacing: 1 }}>
          장바구니
        </Typography>
        <Grid container spacing={3}>
          {cartItems.length === 0 ? (
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 8 }}>
              <ShoppingCartOutlinedIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                장바구니가 비어 있습니다.<br />원하는 상품을 담아보세요!
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate('/products')} sx={{ borderRadius: 3, fontWeight: 700 }}>
                쇼핑하러 가기
              </Button>
            </Grid>
          ) : (
            cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 3, boxShadow: '0 2px 16px 0 rgba(162,89,230,0.08)', mb: 1 }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 2, mr: 2, boxShadow: '0 1px 8px 0 rgba(162,89,230,0.06)' }}
                  />
                  <CardContent sx={{ flex: 1, p: 0 }}>
                    <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
                      <IconButton size="small" color="primary" onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2" sx={{ minWidth: 32, textAlign: 'center', fontWeight: 700, fontSize: 18 }}>{item.quantity}</Typography>
                      <IconButton size="small" color="primary" onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.price.toLocaleString()}원 × {item.quantity}개
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight={700}>
                      {(item.price * item.quantity).toLocaleString()}원
                    </Typography>
                  </CardContent>
                  <IconButton color="error" onClick={() => handleRemove(item.id)} sx={{ ml: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            총 합계
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700}>
            {total.toLocaleString()}원
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={cartItems.length === 0}
          sx={{ py: 1.5, fontSize: 18, borderRadius: 3, fontWeight: 700, boxShadow: '0 2px 8px rgba(162,89,230,0.08)', position: { xs: 'static', md: 'sticky' }, bottom: 0 }}
        >
          결제하기
        </Button>
      </Box>
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </>
  );
} 