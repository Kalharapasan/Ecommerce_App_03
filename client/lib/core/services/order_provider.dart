import 'package:flutter/material.dart';
import '../models/order_model.dart';
import 'api_service.dart';

class OrderProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  List<OrderModel> _orders = [];
  bool _isLoading = false;
  String? _error;

  List<OrderModel> get orders => _orders;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchMyOrders() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.dio.get('/orders/my');
      var list = response.data as List;
      _orders = list.map((o) => OrderModel.fromJson(o)).toList();
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = 'Failed to load orders';
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> createOrder(String address, String phone) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _apiService.dio.post(
        '/orders/create',
        queryParameters: {'shippingAddress': address, 'phoneNumber': phone},
      );
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Failed to create order';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
}
