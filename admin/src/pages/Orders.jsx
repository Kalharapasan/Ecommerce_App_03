import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Select, MenuItem, IconButton } from '@mui/material';
import { Eye, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <Clock size={16} />;
      case 'SHIPPED': return <Truck size={16} />;
      case 'DELIVERED': return <CheckCircle size={16} />;
      case 'CANCELLED': return <XCircle size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'SHIPPED': return 'info';
      case 'DELIVERED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Orders Management</Typography>
        <Typography variant="body1" color="textSecondary">Manage customer orders and shipping status.</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #e2e8f0' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell sx={{ fontWeight: 'bold' }}>#ORD-{order.id}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">{order.customerName}</Typography>
                  <Typography variant="caption" color="textSecondary">{order.customerEmail}</Typography>
                </TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell fontWeight="bold">${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(order.status)}
                    label={order.status}
                    size="small"
                    color={getStatusColor(order.status)}
                    sx={{ fontWeight: 'bold', px: 1 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Select
                    size="small"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    sx={{ minWidth: 120, mr: 1 }}
                  >
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="SHIPPED">Shipped</MenuItem>
                    <MenuItem value="DELIVERED">Delivered</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  </Select>
                  <IconButton size="small"><Eye size={18} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
