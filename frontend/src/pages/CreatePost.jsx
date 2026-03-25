import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Avatar, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function CreatePost() {
  const [text, setText]     = useState('');
  const [image, setImage]   = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError]   = useState('');
  const { user }            = useAuth();
  const navigate            = useNavigate();

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text && !image) return setError('Add text or an image');
    const formData = new FormData();
    if (text)  formData.append('text', text);
    if (image) formData.append('image', image);
    try {
      await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, position: 'relative' }}>
        <IconButton
          onClick={() => navigate('/')}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#1a1a2e' }}>{user?.username?.[0]?.toUpperCase()}</Avatar>
          <TextField
            fullWidth multiline rows={3} placeholder={`What's on your mind, ${user?.username}?`}
            value={text} onChange={e => setText(e.target.value)}
            variant="outlined" sx={{ '& fieldset': { borderRadius: 2 } }}
          />
        </Box>
        {preview && <Box component="img" src={preview} sx={{ width: '100%', borderRadius: 2, mb: 2, maxHeight: 300, objectFit: 'cover' }} />}
        {error && <Typography color="error" mb={1}>{error}</Typography>}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button component="label" startIcon={<ImageIcon />} sx={{ color: '#1a1a2e' }}>
            Photo
            <input type="file" hidden accept="image/*" onChange={handleImage} />
          </Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ px: 3, bgcolor: '#1a1a2e' }}>Post</Button>
        </Box>
      </Paper>
    </Box>
  );
}