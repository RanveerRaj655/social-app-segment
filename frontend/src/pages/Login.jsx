import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login }         = useAuth();
  const navigate          = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f2f5' }}>
      <Paper elevation={3} sx={{ p: 4, width: 380, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">Welcome back</Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" margin="normal"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <TextField fullWidth label="Password" type="password" margin="normal"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1.2, bgcolor: '#1a1a2e' }}>
            Login
          </Button>
        </form>
        <Typography mt={2} textAlign="center" variant="body2">
          No account? <Link onClick={() => navigate('/signup')} sx={{ cursor: 'pointer' }}>Sign up</Link>
        </Typography>
      </Paper>
    </Box>
  );
}