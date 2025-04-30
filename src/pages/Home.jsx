import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sliderImages = [
  { url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80', text: '여름 신상 최대 50% 할인!' },
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80', text: '가구/인테리어 특별전' },
  { url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80', text: '전자제품 베스트셀러' },
];

const categories = [
  { label: '신선식품', icon: <StorefrontIcon />, color: 'linear-gradient(90deg, #e0c3fc 0%, #a259e6 100%)' },
  { label: '가공식품', icon: <StorefrontIcon />, color: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)' },
  { label: '생활용품', icon: <StorefrontIcon />, color: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)' },
  { label: '뷰티', icon: <StorefrontIcon />, color: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)' },
  { label: '가전', icon: <StorefrontIcon />, color: 'linear-gradient(90deg, #e0c3fc 0%, #a259e6 100%)' },
  { label: '패션', icon: <StorefrontIcon />, color: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)' },
];

const reviews = [
  { name: '김철수', text: '배송이 정말 빨라요! 상품도 신선하고 만족합니다.', rating: 5 },
  { name: '이영희', text: '할인 상품이 많아서 자주 이용해요.', rating: 4 },
  { name: '박민수', text: '고객센터 응대가 친절해서 좋았습니다.', rating: 5 },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=4')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ marginTop: 8, minHeight: '80vh', pb: 6 }}>
      {/* 상단 슬라이더 */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 5 }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 32px 0 rgba(162,89,230,0.10)' }}
        >
          {sliderImages.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={{ position: 'relative', height: 260, background: '#eee' }}>
                <img src={slide.url} alt={slide.text} style={{ width: '100%', height: 260, objectFit: 'cover', filter: 'brightness(0.7)' }} />
                <Box sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #a259e6 0%, #e0c3fc 100%)',
                  opacity: 0.55,
                }} />
                <Typography variant="h4" fontWeight={700} sx={{ position: 'absolute', left: 48, bottom: 44, color: '#fff', textShadow: '0 2px 12px rgba(162,89,230,0.25)', letterSpacing: 1 }}>
                  {slide.text}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 상단 배너 */}
      <Paper elevation={3} sx={{
        maxWidth: 900,
        mx: 'auto',
        p: 4,
        mb: 5,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)',
        color: '#fff',
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }}>
        <StorefrontIcon sx={{ fontSize: 80, opacity: 0.9 }} />
        <Box>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1, textShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            쇼핑몰에 오신 걸 환영합니다!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, textShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            다양한 상품, 빠른 배송, 특별한 혜택까지 한 번에!
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
              color: '#333',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                background: 'linear-gradient(90deg, #ffd200 0%, #f7971e 100%)',
              },
            }}
            size="large"
            onClick={() => navigate('/products')}
          >
            상품 보러가기
          </Button>
        </Box>
      </Paper>

      {/* 추천 상품 */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 6 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3, textAlign: 'center', color: '#1976d2' }}>
          추천 상품
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            <Typography sx={{ textAlign: 'center', width: '100%' }}>로딩 중...</Typography>
          ) : (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={product.images[0]}
                      alt={product.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="subtitle1" fontWeight={600} noWrap>
                        {product.title}
                      </Typography>
                      <Typography variant="body1" color="primary" fontWeight="bold">
                        {product.price}원
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* 이벤트/공지 안내 */}
      <Paper elevation={0} sx={{
        maxWidth: 700,
        mx: 'auto',
        p: 3,
        mb: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        background: 'linear-gradient(90deg, #e0c3fc 0%, #a259e6 100%)',
        borderRadius: 4,
        boxShadow: '0 2px 16px 0 rgba(162,89,230,0.10)',
        color: '#4b266b',
      }}>
        <CelebrationIcon color="warning" sx={{ fontSize: 40, color: '#fff', mr: 1, textShadow: '0 2px 8px rgba(162,89,230,0.15)' }} />
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', textShadow: '0 2px 8px rgba(162,89,230,0.15)' }}>
            신규 회원 첫 구매 10% 할인 이벤트!
          </Typography>
          <Typography variant="body2" sx={{ color: '#f3eaff', fontWeight: 500 }}>
            지금 회원가입하고 첫 구매 시 즉시 할인 혜택을 받아보세요.
          </Typography>
        </Box>
      </Paper>

      {/* 카테고리 메뉴 */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
        {categories.map((cat) => (
          <Grid item key={cat.label} xs={6} sm={4} md={2}>
            <Box
              sx={{
                p: 2.5,
                textAlign: 'center',
                background: cat.color,
                borderRadius: 3,
                cursor: 'pointer',
                transition: '0.2s',
                boxShadow: '0 2px 12px 0 rgba(162,89,230,0.06)',
                '&:hover': {
                  boxShadow: '0 8px 24px 0 rgba(162,89,230,0.13)',
                  transform: 'translateY(-4px) scale(1.04)',
                  background: '#f3eaff',
                },
              }}
            >
              {cat.icon}
              <Typography fontWeight={700} sx={{ mt: 1, color: 'primary.main', fontSize: 17 }}>{cat.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* 고객 후기 */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 6 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'primary.main', letterSpacing: 1 }}>고객 후기</Typography>
        <Grid container spacing={2}>
          {reviews.map((r, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box sx={{
                p: 3,
                borderRadius: 3,
                minHeight: 120,
                background: '#fff',
                boxShadow: '0 2px 16px 0 rgba(162,89,230,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1,
              }}>
                <Typography fontWeight={700} sx={{ mb: 1, color: 'primary.main' }}>{r.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{r.text}</Typography>
                <Typography sx={{ color: '#a259e6', fontWeight: 700, fontSize: 18 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 푸터 */}
      <Box sx={{ textAlign: 'center', color: '#fff', fontSize: 15, mt: 8, py: 4, borderTop: 'none', background: 'linear-gradient(90deg, #a259e6 0%, #e0c3fc 100%)', letterSpacing: 1 }}>
        <Box sx={{ mb: 1, fontWeight: 500 }}>
          고객센터: 1234-5678 | 이메일: help@shop.com | 카카오톡: @쇼핑몰
        </Box>
        <Box sx={{ mb: 1 }}>
          <Button size="small" color="inherit" sx={{ color: '#fff', fontWeight: 700 }}>이용약관</Button>
          <Button size="small" color="inherit" sx={{ color: '#fff', fontWeight: 700 }}>개인정보처리방침</Button>
          <Button size="small" color="inherit" sx={{ color: '#fff', fontWeight: 700 }}>회사소개</Button>
        </Box>
        <Box sx={{ fontSize: 13, color: '#f3eaff' }}>
          © {new Date().getFullYear()} 쇼핑몰. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
} 