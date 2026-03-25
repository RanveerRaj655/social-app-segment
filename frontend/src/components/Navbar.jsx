import {
  AppBar, Toolbar, Typography, IconButton,
  Avatar, Box, InputBase, Button, Menu, MenuItem
} from '@mui/material';
import SearchIcon        from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useLocation, useNavigate }   from 'react-router-dom';
import { useAuth }       from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const showSearch = !['/login', '/signup'].includes(location.pathname);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #e8e8e8' }}>
      <Toolbar sx={{ gap: 1.5 }}>
        {/* Logo */}
        <Typography
          fontWeight={800} fontSize={18}
          sx={{ color: '#1a1a2e', cursor: 'pointer', mr: 1, letterSpacing: -0.5 }}
          onClick={() => navigate('/')}
        >
          Social
        </Typography>

        {/* Search bar */}
        {showSearch && (
          <Box sx={{
            display: 'flex', alignItems: 'center', bgcolor: '#f5f6f8',
            borderRadius: 5, px: 1.5, py: 0.3, flexGrow: 1, maxWidth: 260
          }}>
            <SearchIcon sx={{ color: '#aaa', fontSize: 18, mr: 0.5 }} />
            <InputBase
              placeholder="Search posts or users..."
              sx={{ fontSize: 13, color: '#333' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* New post */}
            <IconButton onClick={() => navigate('/create')} sx={{ color: '#1a1a2e' }}>
              <AddBoxOutlinedIcon />
            </IconButton>
            
            {/* Profile Avatar with Menu */}
            <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: '#1a1a2e', fontSize: 14, fontWeight: 700 }}>
                {user.username?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: 1 }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f', fontWeight: 600 }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography
              sx={{ cursor: 'pointer', fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}
              onClick={() => navigate('/login')}
            >Login</Typography>
            <Typography
              sx={{ cursor: 'pointer', fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}
              onClick={() => navigate('/signup')}
            >Sign Up</Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}