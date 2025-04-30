import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle } from '../firebase';
import { kakaoLogin, initKakao } from '../kakaoLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    initKakao();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 (추후 구현)
    alert('로그인 시도: ' + email);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      alert('구글 로그인 성공! ' + result.user.email);
    } catch (err) {
      alert('구글 로그인 실패: ' + err.message);
    }
  };

  return (
    <Box sx={{ marginTop: 10, display: 'flex', justifyContent: 'center', background: '#f9f9f9', minHeight: '80vh', pb: 8 }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, borderRadius: 4, boxShadow: '0 4px 32px 0 rgba(162,89,230,0.10)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3, textAlign: 'center', color: 'primary.main', letterSpacing: 1 }}>
            로그인
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{ borderRadius: 2, background: '#faf7fd' }}
            />
            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{ borderRadius: 2, background: '#faf7fd' }}
            />
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ mt: 2, py: 1.5, fontWeight: 700, borderRadius: 3 }}>
              로그인
            </Button>
          </form>
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<GoogleIcon />}
              fullWidth
              onClick={handleGoogleLogin}
              sx={{ fontWeight: 700, borderRadius: 3 }}
            >
              Google로 로그인
            </Button>
            <Button
              variant="outlined"
              color="warning"
              fullWidth
              onClick={kakaoLogin}
              sx={{ fontWeight: 700, borderRadius: 3 }}
            >
              Kakao로 로그인
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} 