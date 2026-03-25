import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import CreatePost from './pages/CreatePost';
import SearchResults from './pages/SearchResults';

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login"  element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/"       element={<Protected><Feed /></Protected>} />
          <Route path="/create" element={<Protected><CreatePost /></Protected>} />
          <Route path="/search" element={<Protected><SearchResults /></Protected>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}