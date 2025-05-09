import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// 쿠폰 정보 (실제로는 서버에서 가져와야 함)
const AVAILABLE_COUPONS = [
  { 
    id: 'NEW10', 
    code: 'WELCOME10', 
    name: '신규 회원 10% 할인 쿠폰', 
    description: '첫 구매시 전 상품 10% 할인', 
    discount: 10, 
    minPurchase: 10000, 
    validUntil: new Date(new Date().setDate(new Date().getDate() + 30)), // 30일 유효기간
    type: 'percent'
  },
  { 
    id: 'SUMMER20', 
    code: 'SUMMER20', 
    name: '여름 시즌 특별 할인 쿠폰', 
    description: '여름 의류 구매시 20% 할인', 
    discount: 20, 
    minPurchase: 30000, 
    validUntil: new Date(new Date().setDate(new Date().getDate() + 60)), // 60일 유효기간
    type: 'percent'
  }
];

const Coupon = ({ type = 'button' }) => {
  const [open, setOpen] = useState(false);
  const [myCoupons, setMyCoupons] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  // 로컬 스토리지에서 보유 쿠폰 정보 로드
  useEffect(() => {
    const savedCoupons = localStorage.getItem('myCoupons');
    if (savedCoupons) {
      setMyCoupons(JSON.parse(savedCoupons));
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCoupon = (couponId) => {
    // 이미 보유한 쿠폰인지 확인
    if (myCoupons.some(coupon => coupon.id === couponId)) {
      setAlertSeverity('warning');
      setAlertMessage('이미 발급받은 쿠폰입니다.');
      setAlertOpen(true);
      return;
    }

    // 쿠폰 정보 찾기
    const coupon = AVAILABLE_COUPONS.find(c => c.id === couponId);
    if (!coupon) return;

    // 쿠폰 발급 시간 기록
    const couponWithTimestamp = {
      ...coupon,
      issuedAt: new Date().toISOString()
    };

    // 쿠폰 저장
    const updatedCoupons = [...myCoupons, couponWithTimestamp];
    setMyCoupons(updatedCoupons);
    localStorage.setItem('myCoupons', JSON.stringify(updatedCoupons));

    // 발급 성공 알림
    setAlertSeverity('success');
    setAlertMessage(`'${coupon.name}' 쿠폰이 발급되었습니다.`);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setAlertSeverity('success');
      setAlertMessage('쿠폰 코드가 클립보드에 복사되었습니다.');
      setAlertOpen(true);
    });
  };

  // 버튼 타입 렌더링 (홈페이지에서 사용)
  if (type === 'button') {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          startIcon={<LocalOfferIcon />}
          sx={{
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: 2,
          }}
        >
          쿠폰 받기
        </Button>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={700}>
              쿠폰 발급
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                사용 가능한 쿠폰
              </Typography>
              {AVAILABLE_COUPONS.map((coupon) => (
                <Paper 
                  key={coupon.id} 
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    border: '1px dashed #a259e6',
                    background: 'linear-gradient(135deg, #f8f3ff 0%, #ffffff 100%)',
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700} color="primary">
                      {coupon.name}
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="small" 
                      onClick={() => getCoupon(coupon.id)}
                      sx={{ 
                        background: 'linear-gradient(90deg, #a259e6 0%, #e0c3fc 100%)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #9240de 0%, #d9b0fc 100%)',
                        },
                      }}
                    >
                      발급받기
                    </Button>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {coupon.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      최소 주문금액: {coupon.minPurchase.toLocaleString()}원
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      유효기간: {formatDate(coupon.validUntil)}까지
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                내 쿠폰 목록
              </Typography>
              {myCoupons.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  보유한 쿠폰이 없습니다.
                </Typography>
              ) : (
                <List>
                  {myCoupons.map((coupon, index) => (
                    <React.Fragment key={coupon.id}>
                      {index > 0 && <Divider />}
                      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <ListItemText 
                            primary={coupon.name} 
                            secondary={`할인: ${coupon.discount}${coupon.type === 'percent' ? '%' : '원'}`}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" color="primary.main" sx={{ mr: 1, fontWeight: 600 }}>
                              {coupon.code}
                            </Typography>
                            <IconButton size="small" onClick={() => copyToClipboard(coupon.code)}>
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            발급일: {formatDate(coupon.issuedAt)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            만료일: {formatDate(coupon.validUntil)}
                          </Typography>
                        </Box>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ fontWeight: 600 }}>닫기</Button>
          </DialogActions>
        </Dialog>

        <Snackbar 
          open={alertOpen} 
          autoHideDuration={3000} 
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleAlertClose} severity={alertSeverity} variant="filled">
            {alertMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }

  // 다이얼로그 타입 렌더링 (쿠폰 목록만 표시)
  return (
    <>
      <List>
        {myCoupons.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            보유한 쿠폰이 없습니다.
          </Typography>
        ) : (
          myCoupons.map((coupon, index) => (
            <React.Fragment key={coupon.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemText 
                  primary={coupon.name} 
                  secondary={`${coupon.discount}${coupon.type === 'percent' ? '%' : '원'} 할인 / 유효기간: ${formatDate(coupon.validUntil)}까지`}
                />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>

      <Snackbar 
        open={alertOpen} 
        autoHideDuration={3000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Coupon; 