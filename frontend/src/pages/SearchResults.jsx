import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import api from '../api/axios';
import PostCard from '../components/PostCard';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/posts/search?q=${encodeURIComponent(query)}`);
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', pb: 6 }}>
      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Results for "{query}"
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress sx={{ color: '#1a1a2e' }} />
          </Box>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} onUpdate={(id, changes) => {
                setPosts(prev => prev.map(p => p._id === id ? { ...p, ...changes } : p));
              }} />
            ))}
            {posts.length === 0 && (
              <Typography color="text.secondary" textAlign="center" mt={4}>
                No posts found matching your search.
              </Typography>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
