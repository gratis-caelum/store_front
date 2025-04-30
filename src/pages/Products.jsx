import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ marginTop: 80, textAlign: 'center' }}>로딩 중...</p>;
  if (error) return <p style={{ marginTop: 80, textAlign: 'center' }}>에러: {error}</p>;

  return (
    <Box sx={{ marginTop: 10, padding: { xs: 1, sm: 3 }, background: '#f9f9f9', minHeight: '80vh', pb: 6 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 4, color: 'primary.main', textAlign: 'center', letterSpacing: 1 }}>
        전체 상품
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: '100%',
                transition: '0.2s',
                boxShadow: '0 2px 16px 0 rgba(162,89,230,0.08)',
                borderRadius: 3,
                '&:hover': {
                  boxShadow: '0 8px 32px 0 rgba(162,89,230,0.18)',
                  transform: 'translateY(-4px) scale(1.03)',
                },
              }}
            >
              <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
                <CardMedia
                  component="img"
                  height="180"
                  image={product.images[0]}
                  alt={product.title}
                  sx={{ objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" fontWeight={700} noWrap sx={{ mb: 1 }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body1" color="primary" fontWeight="bold" sx={{ fontSize: 18 }}>
                    {product.price.toLocaleString()}원
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 