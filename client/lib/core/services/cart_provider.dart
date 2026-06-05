import 'package:flutter/material.dart';
import '../models/cart_model.dart';
import 'api_service.dart';

class CartProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  Cart? _cart;
  bool _isLoading = false;
  String? _error;

  Cart? get cart => _cart;
  bool get isLoading => _isLoading;
  String? get error => _error;

  int get itemCount => _cart?.items.length ?? 0;

  Future<void> fetchCart() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.dio.get('/cart');
      _cart = Cart.fromJson(response.data);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = 'Failed to load cart';
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> addToCart(int productId, int quantity) async {
    try {
      final response = await _apiService.dio.post(
        '/cart/add',
        queryParameters: {'productId': productId, 'quantity': quantity},
      );
      _cart = Cart.fromJson(response.data);
      notifyListeners();
    } catch (e) {
      _error = 'Failed to add to cart';
      notifyListeners();
    }
  }

  Future<void> updateQuantity(int productId, int quantity) async {
    try {
      final response = await _apiService.dio.put(
        '/cart/update',
        queryParameters: {'productId': productId, 'quantity': quantity},
      );
      _cart = Cart.fromJson(response.data);
      notifyListeners();
    } catch (e) {
      _error = 'Failed to update quantity';
      notifyListeners();
    }
  }

  Future<void> removeFromCart(int productId) async {
    try {
      final response = await _apiService.dio.delete('/cart/remove/$productId');
      _cart = Cart.fromJson(response.data);
      notifyListeners();
    } catch (e) {
      _error = 'Failed to remove from cart';
      notifyListeners();
    }
  }
}
