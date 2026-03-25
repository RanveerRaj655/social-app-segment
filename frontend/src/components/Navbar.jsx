import {
  AppBar, Toolbar, Typography, IconButton,
  Avatar, Box, InputBase, Badge
} from '@mui/material';
import SearchIcon        from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useNavigate }   from 'react-router-dom';
import { useAuth }       from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

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
        <Box sx={{
          display: 'flex', alignItems: 'center', bgcolor: '#f5f6f8',
          borderRadius: 5, px: 1.5, py: 0.3, flexGrow: 1, maxWidth: 260
        }}>
          <SearchIcon sx={{ color: '#aaa', fontSize: 18, mr: 0.5 }} />
          <InputBase placeholder="Search users, posts..." sx={{ fontSize: 13, color: '#333' }} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* New post */}
            <IconButton onClick={() => navigate('/create')} sx={{ color: '#1a1a2e' }}>
              <AddBoxOutlinedIcon />
            </IconButton>
            {/* Notifications */}
            <IconButton sx={{ color: '#1a1a2e' }}>
              <Badge badgeContent={0} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            {/* Avatar / logout */}
            <IconButton onClick={logout} sx={{ p: 0.5 }}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: '#1a1a2e', fontSize: 14, fontWeight: 700 }}>
                {user.username?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>
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