import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell, Chip, CircularProgress } from '@mui/material';
import { DollarSign, ShoppingBag, Package, List as ListIcon, ArrowUpRight } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import { getDashboardStats } from '../services/dashboardService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatCard = ({ title, value, icon, color, trend }) => (
  <Paper sx={{ p: 3, position: 'relative', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${color}10`,
          color: color,
        }}
      >
        {icon}
      </Box>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#10b981', backgroundColor: '#f0fdf4', px: 1, borderRadius: 1, height: 24 }}>
          <Typography variant="caption" fontWeight="bold">+{trend}%</Typography>
          <ArrowUpRight size={14} />
        </Box>
      )}
    </Box>
    <Typography variant="body2" color="textSecondary" fontWeight="600" sx={{ mb: 0.5 }}>
      {title}
    </Typography>
    <Typography variant="h4" fontWeight="800">
      {value}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        fill: true,
        label: 'Sales ($)',
        data: [3000, 4500, 3800, 5200, 4800, 6100, 5900], // Mock for now as we don't have monthly data yet
        borderColor: '#0064D2',
        backgroundColor: 'rgba(0, 100, 210, 0.05)',
        tension: 0.4,
      },
    ],
  };

  const categoryLabels = stats ? Object.keys(stats.salesByCategory) : [];
  const categoryValues = stats ? Object.values(stats.salesByCategory) : [];

  const categoryData = {
    labels: categoryLabels.length > 0 ? categoryLabels : ['No Data'],
    datasets: [
      {
        data: categoryValues.length > 0 ? categoryValues : [1],
        backgroundColor: ['#0064D2', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: '-1.5px', mb: 1, color: '#1e293b' }}>
          Seller Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Track your eBay-style business performance and inventory.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Revenue" value={`$${stats?.totalRevenue.toFixed(2)}`} icon={<DollarSign size={24} />} color="#0064D2" trend="12" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Orders" value={stats?.totalOrders.toString()} icon={<ShoppingBag size={24} />} color="#0064D2" trend="8" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Products" value={stats?.totalProducts.toString()} icon={<Package size={24} />} color="#0064D2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Categories" value={stats?.totalCategories.toString()} icon={<ListIcon size={24} />} color="#0064D2" />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight="bold">Sales Analytics</Typography>
              <Select size="small" defaultValue="7d" sx={{ borderRadius: 2, backgroundColor: '#f8fafc' }}>
                <MenuItem value="7d">Last 7 Days</MenuItem>
                <MenuItem value="30d">Last 30 Days</MenuItem>
              </Select>
            </Box>
            <Box sx={{ height: 350 }}>
              <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Sales by Category</Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={categoryData} options={{ cutout: '70%', plugins: { legend: { position: 'bottom' } } }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>AI Sales Projections (Growth Forecast)</Typography>
            <Box sx={{ height: 250 }}>
              <Line 
                data={{
                  labels: stats ? Object.keys(stats.salesProjections) : [],
                  datasets: [{
                    label: 'Forecasted Revenue ($)',
                    data: stats ? Object.values(stats.salesProjections) : [],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                  }]
                }} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { legend: { display: true, position: 'bottom' } } 
                }} 
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Recent Orders</Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#64748b', fontWeight: 'bold' }}>ORDER ID</TableCell>
                    <TableCell sx={{ color: '#64748b', fontWeight: 'bold' }}>DATE</TableCell>
                    <TableCell sx={{ color: '#64748b', fontWeight: 'bold' }}>TOTAL</TableCell>
                    <TableCell sx={{ color: '#64748b', fontWeight: 'bold' }}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats?.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell fontWeight="bold">#ORD-{order.id}</TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status} 
                          size="small" 
                          color="primary" 
                          sx={{ 
                            fontWeight: 'bold', 
                            backgroundColor: order.status === 'DELIVERED' ? '#f0fdf4' : '#e0f2fe', 
                            color: order.status === 'DELIVERED' ? '#166534' : '#0369a1' 
                          }} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
