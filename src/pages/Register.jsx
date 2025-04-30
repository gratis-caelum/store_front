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

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    initKakao();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직 (추후 구현)
    alert('회원가입 시도: ' + email);
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      alert('구글 회원가입 성공! ' + result.user.email);
    } catch (err) {
      alert('구글 회원가입 실패: ' + err.message);
    }
  };

  return (
    <Box sx={{ marginTop: 10, display: 'flex', justifyContent: 'center', background: '#f9f9f9', minHeight: '80vh', pb: 8 }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, borderRadius: 4, boxShadow: '0 4px 32px 0 rgba(162,89,230,0.10)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3, textAlign: 'center', color: 'primary.main', letterSpacing: 1 }}>
            회원가입
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{ borderRadius: 2, background: '#faf7fd' }}
            />
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
              회원가입
            </Button>
          </form>
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<GoogleIcon />}
              fullWidth
              onClick={handleGoogleRegister}
              sx={{ fontWeight: 700, borderRadius: 3 }}
            >
              Google로 회원가입
            </Button>
            <Button
              variant="outlined"
              color="warning"
              fullWidth
              onClick={kakaoLogin}
              sx={{ fontWeight: 700, borderRadius: 3 }}
            >
              Kakao로 회원가입
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} 