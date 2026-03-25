import { Box, Paper, Avatar, InputBase, Divider, IconButton, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CreatePostBox({ onPost }) {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  return (
    <Paper elevation={0} sx={{ borderRadius: 3, mb: 2, overflow: 'hidden', border: '1px solid #e8e8e8', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 2, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontWeight={700} fontSize={16}>Create Post</Typography>
      </Box>

      {/* Input row */}
      <Box sx={{ px: 2, pb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: '#1a1a2e', width: 40, height: 40, fontWeight: 700 }}>
          {user?.username?.[0]?.toUpperCase()}
        </Avatar>
        <InputBase
          fullWidth
          placeholder="What's on your mind?"
          onClick={() => navigate('/create')}
          readOnly
          sx={{
            bgcolor: '#f5f6f8',
            borderRadius: 5,
            px: 2,
            py: 0.8,
            fontSize: 14,
            cursor: 'pointer',
            color: 'text.secondary',
          }}
        />
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Action icons */}
      <Box sx={{ px: 2, py: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={() => navigate('/create')} sx={{ color: '#555' }}>
          <ImageIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => navigate('/create')} sx={{ color: '#555' }}>
          <EmojiEmotionsOutlinedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="small"
          onClick={() => navigate('/create')}
          sx={{ bgcolor: '#1a1a2e', color: '#fff', '&:hover': { bgcolor: '#2d2d4e' }, width: 34, height: 34 }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
}