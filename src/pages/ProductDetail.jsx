import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store';
import Toast from '../components/Toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('상품 정보를 불러오지 못했습니다.');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ marginTop: 80, textAlign: 'center' }}>로딩 중...</p>;
  if (error) return <p style={{ marginTop: 80, textAlign: 'center' }}>에러: {error}</p>;
  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    }));
    setToastOpen(true);
  };

  return (
    <>
      <Box sx={{ marginTop: 10, display: 'flex', justifyContent: 'center', background: '#f9f9f9', minHeight: '80vh', pb: 6 }}>
        <Card sx={{
          maxWidth: 520,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 4px 32px 0 rgba(162,89,230,0.10)',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <CardMedia
            component="img"
            height="340"
            image={product.images[0]}
            alt={product.title}
            sx={{ objectFit: 'cover', borderRadius: 3, mb: 2, width: '100%', maxWidth: 400, boxShadow: '0 2px 16px 0 rgba(162,89,230,0.08)' }}
          />
          <CardContent sx={{ width: '100%' }}>
            <Typography gutterBottom variant="h5" fontWeight={700} sx={{ mb: 2, color: 'primary.main' }}>
              {product.title}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 1, fontSize: 22 }}>
              {product.price.toLocaleString()}원
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, minHeight: 60 }}>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ py: 1.5, fontSize: 18, borderRadius: 3, boxShadow: '0 2px 8px rgba(162,89,230,0.08)', fontWeight: 700 }}
              onClick={handleAddToCart}
            >
              장바구니 담기
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Toast open={toastOpen} message="장바구니에 담았습니다!" onClose={() => setToastOpen(false)} />
    </>
  );
} 