import api from './api';

export const getAllOrders = () => api.get('/orders');
export const updateOrderStatus = (orderId, status) => api.put(`/orders/${orderId}/status?status=${status}`);
