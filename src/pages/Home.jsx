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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SearchBar from '../components/SearchBar';
import RecentlyViewed from '../components/RecentlyViewed';
import Coupon from '../components/Coupon';

const sliderImages = [
  { url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80', text: '여름 신상 최대 50% 할인!' },
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80', text: '가구/인테리어 특별전' },
  { url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80', text: '전자제품 베스트셀러' },
];

// 카테고리 아이콘 색상 정의
const categoryColors = [
  'linear-gradient(90deg, #e0c3fc 0%, #a259e6 100%)',
  'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
  'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)',
  'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
  'linear-gradient(90deg, #e0c3fc 0%, #a259e6 100%)'
];

// 카테고리 영어-한글 매핑
const categoryMapping = {
  'Clothes': '의류',
  'Electronics': '전자제품',
  'Furniture': '가구/인테리어',
  'Shoes': '신발',
  'Others': '기타',
  'Miscellaneous': '잡화'
};

const reviews = [
  { name: '김철수', text: '배송이 정말 빨라요! 상품도 신선하고 만족합니다.', rating: 5 },
  { name: '이영희', text: '할인 상품이 많아서 자주 이용해요.', rating: 4 },
  { name: '박민수', text: '고객센터 응대가 친절해서 좋았습니다.', rating: 5 },
  { name: '정지원', text: '상품의 퀄리티가 좋고 가격도 합리적이에요.', rating: 4 },
  { name: '최수진', text: '다양한 상품을 구경할 수 있어서 좋습니다. 배송도 빠르고 포장이 꼼꼼해요.', rating: 5 },
  { name: '강현우', text: '앱 사용이 편리하고 적립금 혜택도 좋아요!', rating: 4 },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const navigate = useNavigate();

  // 상품 로드
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=4')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('상품 로드 에러:', error);
        setLoading(false);
      });
  }, []);

  // 카테고리 로드
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then((res) => res.json())
      .then((data) => {
        // 카테고리 목록에 아이콘 속성과 한글 이름 추가
        const categoriesWithIcons = data.map((category, index) => ({
          ...category,
          icon: <StorefrontIcon />,
          color: categoryColors[index % categoryColors.length],
          // 영어 이름을 한글로 변환
          koreanName: categoryMapping[category.name] || category.name
        }));
        setCategories(categoriesWithIcons);
        setCategoryLoading(false);
      })
      .catch(error => {
        console.error('카테고리 로드 에러:', error);
        setCategoryLoading(false);
      });
  }, []);

  // 카테고리별 상품 로드
  const loadProductsByCategory = (categoryId) => {
    setLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products?limit=4`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('카테고리별 상품 로드 에러:', error);
        setLoading(false);
      });
  };

  // 상품 클릭 시 최근 본 상품에 추가하는 함수
  const handleProductClick = (product) => {
    // 로컬 스토리지에서 기존 최근 본 상품 목록 가져오기
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    
    // 이미 있는 상품인지 확인하고 있으면 제거
    const filteredProducts = recentlyViewed.filter(item => item.id !== product.id);
    
    // 새 상품을 배열 앞에 추가 (최대 10개까지만 저장)
    const newRecentlyViewed = [
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0]
      },
      ...filteredProducts
    ].slice(0, 10);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed));
    
    // 스토리지 이벤트 발생시켜 다른 컴포넌트에 알리기
    window.dispatchEvent(new Event('storage'));
    
    // 상품 페이지로 이동
    navigate(`/products/${product.id}`);
  };

  return (
    <Box sx={{ marginTop: 8, minHeight: '80vh', pb: 6 }}>
      {/* 최근 본 상품 - 사이드바로 분리 */}
      <RecentlyViewed />
      
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

      {/* 검색 바 */}
      <SearchBar />

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

      {/* 카테고리 메뉴 */}
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 900, mx: 'auto', mb: 6 }}>
        {categoryLoading ? (
          <Typography sx={{ textAlign: 'center', width: '100%', py: 3 }}>카테고리 로딩 중...</Typography>
        ) : (
          categories.map((cat) => (
            <Grid item key={cat.id} xs={6} sm={4} md={2}>
              <Box
                onClick={() => loadProductsByCategory(cat.id)}
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
                <Typography fontWeight={700} sx={{ mt: 1, color: 'primary.main', fontSize: 17 }}>{cat.koreanName}</Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      {/* 추천 상품 */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 6 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3, textAlign: 'center', color: '#1976d2' }}>
          추천 상품
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            <Typography sx={{ textAlign: 'center', width: '100%', py: 3 }}>상품 로딩 중...</Typography>
          ) : (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.12)'
                  }
                }}>
                  <CardActionArea onClick={() => handleProductClick(product)}>
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
                      <Typography variant="caption" color="text.secondary">
                        카테고리: {categoryMapping[product.category?.name] || product.category?.name || '미분류'}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* 결제 옵션 */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 6 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3, textAlign: 'center', color: '#1976d2' }}>
          간편한 결제 옵션
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              textAlign: 'center',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #fff 0%, #f3eaff 100%)',
              boxShadow: '0 4px 20px rgba(162,89,230,0.1)',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(162,89,230,0.2)',
              }
            }}>
              <ShoppingCartIcon sx={{ fontSize: 60, color: '#a259e6' }} />
              <Typography variant="h6" fontWeight={700} sx={{ color: '#a259e6' }}>
                장바구니 결제
              </Typography>
              <Typography>
                여러 상품을 한 번에 결제하고 싶으신가요? 장바구니에 담아 한 번에 결제하세요!
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ 
                  mt: 'auto',
                  borderRadius: 2,
                  fontWeight: 600,
                }}
                onClick={() => navigate('/cart')}
              >
                장바구니로 이동
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              textAlign: 'center',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #fff 0%, #e6f7ff 100%)',
              boxShadow: '0 4px 20px rgba(33,147,176,0.1)',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(33,147,176,0.2)',
              }
            }}>
              <PaymentIcon sx={{ fontSize: 60, color: '#2193b0' }} />
              <Typography variant="h6" fontWeight={700} sx={{ color: '#2193b0' }}>
                바로 결제
              </Typography>
              <Typography>
                지금 바로 원하는 상품을 구매하고 싶으신가요? 바로 결제 옵션을 이용해보세요!
              </Typography>
              <Button 
                variant="contained"
                sx={{ 
                  mt: 'auto',
                  bgcolor: '#2193b0',
                  '&:hover': { bgcolor: '#19798f' },
                  borderRadius: 2,
                  fontWeight: 600,
                }} 
                onClick={() => navigate('/products')}
              >
                상품 구매하기
              </Button>
            </Paper>
          </Grid>
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
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', textShadow: '0 2px 8px rgba(162,89,230,0.15)' }}>
            신규 회원 첫 구매 10% 할인 이벤트!
          </Typography>
          <Typography variant="body2" sx={{ color: '#f3eaff', fontWeight: 500, mb: 1 }}>
            지금 회원가입하고 첫 구매 시 즉시 할인 혜택을 받아보세요.
          </Typography>
          <Coupon />
        </Box>
      </Paper>

      {/* 고객 후기 */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 6 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'primary.main', letterSpacing: 1 }}>고객 후기</Typography>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
          }}
          style={{ padding: '10px 5px 40px 5px' }}
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 푸터 */}
      <Box sx={{ textAlign: 'center', color: '#fff', fontSize: 15, mt: 8, py: 4, borderTop: 'none', background: 'linear-gradient(90deg, #a259e6 0%, #e0c3fc 100%)', letterSpacing: 1 }}>
        <Box sx={{ mb: 1, fontWeight: 500 }}>
          고객센터: 02-1234-5678 | 이메일: customer@shopnow.kr | 카카오톡: @쇼핑나우
        </Box>
        <Box sx={{ mb: 1 }}>
          <Button size="small" color="inherit" sx={{ color: '#fff', fontWeight: 700 }}>이용약관</Button>
          <Button size="small" color="inherit" sx={{ color: '#fff', fontWeight: 700 }}>개인정보처리방침</Button>
          <Button size="small" color="inherit" sx={{ color: '#fff', fontWeight: 700 }}>회사소개</Button>
        </Box>
        <Box sx={{ fontSize: 13, color: '#f3eaff' }}>
          © {new Date().getFullYear()} 쇼핑나우. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
} 