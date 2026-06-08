import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Avatar, IconButton } from '@mui/material';
import Sidebar from './Sidebar';
import { Bell, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: 'white',
            color: '#1e293b',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton size="small">
                <Search size={20} />
              </IconButton>
              <IconButton size="small">
                <Bell size={20} />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1 }}>
                <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" fontWeight="600">
                    {user?.fullName || 'Admin User'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Administrator
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    fontSize: '0.9rem',
                  }}
                >
                  {user?.fullName?.[0] || 'A'}
                </Avatar>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
