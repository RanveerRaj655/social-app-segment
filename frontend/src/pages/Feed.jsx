import { useEffect, useState, useCallback } from 'react';
import {
  Box, Typography, CircularProgress, Button, Tabs, Tab, Container
} from '@mui/material';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import CreatePostBox from '../components/CreatePostBox';

export default function Feed() {
  const [posts, setPosts]     = useState([]);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);
  const [loading, setLoading] = useState(false);
  const [tab, setTab]         = useState(0);

  const fetchPosts = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/posts?page=${p}&limit=10`);
      setPosts(prev => p === 1 ? data.posts : [...prev, ...data.posts]);
      setPages(data.pages);
      setPage(p);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(1); }, [fetchPosts]);

  const handleUpdate = (id, changes) => {
    setPosts(prev => prev.map(p => p._id === id ? { ...p, ...changes } : p));
  };

  const getSortedPosts = () => {
    const copy = [...posts];
    if (tab === 1) return copy.sort((a, b) => b.likes.length - a.likes.length);
    if (tab === 2) return copy.sort((a, b) => b.comments.length - a.comments.length);
    return copy;
  };

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', pb: 6 }}>
      <Container maxWidth="sm" sx={{ pt: 2 }}>

        {/* Create post box */}
        <CreatePostBox onPost={() => fetchPosts(1)} />

        {/* Filter tabs */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, mb: 2, px: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons={false}
            sx={{
              '& .MuiTab-root': { fontSize: 13, fontWeight: 600, textTransform: 'none', minWidth: 'auto', px: 2 },
              '& .Mui-selected': { color: '#1a1a2e' },
              '& .MuiTabs-indicator': { bgcolor: '#1a1a2e', height: 3, borderRadius: 2 },
            }}
          >
            <Tab label="All Posts" />
            <Tab label="Most Liked" />
            <Tab label="Most Commented" />
          </Tabs>
        </Box>

        {/* Posts */}
        {getSortedPosts().map(post => (
          <PostCard key={post._id} post={post} onUpdate={handleUpdate} />
        ))}

        {loading && (
          <Box textAlign="center" my={3}>
            <CircularProgress size={28} sx={{ color: '#1a1a2e' }} />
          </Box>
        )}

        {!loading && page < pages && (
          <Box textAlign="center" my={2}>
            <Button
              onClick={() => fetchPosts(page + 1)}
              variant="outlined"
              sx={{ borderRadius: 5, borderColor: '#1a1a2e', color: '#1a1a2e', textTransform: 'none', fontWeight: 600 }}
            >
              Load more
            </Button>
          </Box>
        )}

        {!loading && posts.length === 0 && (
          <Box textAlign="center" mt={10}>
            <Typography fontSize={40}>📭</Typography>
            <Typography color="text.secondary" mt={1}>No posts yet. Be the first!</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}