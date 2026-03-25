import { useState } from 'react';
import {
  Card, CardContent, CardMedia, CardActions,
  Avatar, Box, Typography, IconButton, Button, Chip
} from '@mui/material';
import FavoriteIcon        from '@mui/icons-material/Favorite';
import FavoriteBorderIcon  from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon   from '@mui/icons-material/ShareOutlined';
import { useAuth }         from '../context/AuthContext';
import api                 from '../api/axios';
import CommentModal        from './CommentModal';

// Random soft avatar background colors
const avatarColors = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#98D8C8','#F7DC6F'];
const getColor = name => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function PostCard({ post, onUpdate }) {
  const { user }          = useAuth();
  const [openComments, setOpenComments] = useState(false);
  const liked             = post.likes.includes(user?.username);
  const BACKEND           = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  const handleLike = async () => {
    try {
      const { data } = await api.put(`/posts/${post._id}/like`);
      onUpdate(post._id, { likes: data.likes });
    } catch (err) { console.error(err); }
  };

  return (
    <>
      <Card elevation={0} sx={{
        borderRadius: 3, mb: 2,
        border: '1px solid #e8e8e8',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }
      }}>
        <CardContent sx={{ pb: 1 }}>
          {/* Author row */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: getColor(post.author), width: 42, height: 42, fontWeight: 700, fontSize: 16 }}>
                {post.author?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography fontWeight={700} fontSize={14} lineHeight={1.3}>
                  {post.author}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontSize={11}>
                  @{post.author?.toLowerCase()}  ·  {timeAgo(post.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Post text */}
          {post.text && (
            <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6, color: '#333' }}>
              {post.text}
            </Typography>
          )}
        </CardContent>

        {/* Post image */}
        {post.imageUrl && (
          <CardMedia
            component="img"
            image={`${BACKEND}${post.imageUrl}`}
            alt="post"
            sx={{ maxHeight: 320, objectFit: 'cover', width: '100%' }}
          />
        )}

        {/* Actions */}
        <CardActions sx={{ px: 2, py: 1, display: 'flex', gap: 2 }}>
          {/* Like */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <IconButton size="small" onClick={handleLike} sx={{ color: liked ? '#e0245e' : '#888', p: 0.5 }}>
              {liked ? <FavoriteIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
            </IconButton>
            <Typography fontSize={13} color="text.secondary" fontWeight={600}>
              {post.likes.length}
            </Typography>
          </Box>

          {/* Comment */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <IconButton size="small" onClick={() => setOpenComments(true)} sx={{ color: '#888', p: 0.5 }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 19 }} />
            </IconButton>
            <Typography fontSize={13} color="text.secondary" fontWeight={600}>
              {post.comments.length}
            </Typography>
          </Box>

          {/* Share */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <IconButton size="small" sx={{ color: '#888', p: 0.5 }}>
              <ShareOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
            <Typography fontSize={13} color="text.secondary" fontWeight={600}>0</Typography>
          </Box>
        </CardActions>
      </Card>

      <CommentModal
        open={openComments}
        onClose={() => setOpenComments(false)}
        post={post}
        onUpdate={onUpdate}
      />
    </>
  );
}