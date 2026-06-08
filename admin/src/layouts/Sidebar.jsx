import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { LayoutDashboard, ShoppingBag, Layers, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const drawerWidth = 260;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { text: 'Products', icon: <ShoppingBag size={20} />, path: '/products' },
    { text: 'Categories', icon: <Layers size={20} />, path: '/categories' },
    { text: 'Orders', icon: <ShoppingCart size={20} />, path: '/orders' },
    { text: 'Customers', icon: <Users size={20} />, path: '/customers' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff', // White
          color: '#1e293b',
          borderRight: '1px solid #e2e8f0',
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: '-1.5px' }}>
          <span style={{ color: '#E53238' }}>e</span>
          <span style={{ color: '#0064D2' }}>b</span>
          <span style={{ color: '#F5AF02' }}>a</span>
          <span style={{ color: '#86B817' }}>y</span>
        </Typography>
        <Typography variant="caption" sx={{ mt: 1, ml: 0.5, color: '#94a3b8', fontWeight: 'bold' }}>
          ADMIN
        </Typography>
      </Box>
      <Divider sx={{ mx: 2 }} />
      <List sx={{ px: 2, mt: 3 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: '8px',
              mb: 0.5,
              py: 1,
              backgroundColor: location.pathname === item.path ? '#f1f5f9' : 'transparent',
              color: location.pathname === item.path ? '#0064D2' : '#64748b',
              '&:hover': {
                backgroundColor: '#f8fafc',
                color: '#0064D2',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <List>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              borderRadius: '8px',
              color: '#f87171',
              '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
