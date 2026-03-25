import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, ListItem, ListItemText, Avatar, Box, Typography, Divider } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function CommentModal({ open, onClose, post, onUpdate }) {
  const [text, setText] = useState('');
  const { user } = useAuth();

  const handleComment = async () => {
    if (!text.trim()) return;
    try {
      const { data } = await api.post(`/posts/${post._id}/comment`, { text });
      onUpdate(post._id, { comments: data.comments });
      setText('');
    } catch (err) { console.error(err); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={700}>Comments ({post.comments.length})</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: 360, overflowY: 'auto' }}>
        {post.comments.length === 0
          ? <Typography color="text.secondary" textAlign="center" mt={2}>No comments yet. Be the first!</Typography>
          : <List disablePadding>
              {post.comments.map((c, i) => (
                <Box key={i}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: '#1a1a2e', fontSize: 14 }}>
                      {c.username?.[0]?.toUpperCase()}
                    </Avatar>
                    <ListItemText
                      primary={<Typography fontWeight={600} variant="body2">@{c.username}</Typography>}
                      secondary={c.text}
                    />
                  </ListItem>
                  {i < post.comments.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
        }
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: 1, p: 2, alignItems: 'stretch' }}>
        <TextField
          fullWidth size="small" placeholder="Write a comment..."
          value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleComment()}
        />
        <Button variant="contained" sx={{ bgcolor: '#1a1a2e' }} onClick={handleComment}>Post Comment</Button>
      </DialogActions>
    </Dialog>
  );
}