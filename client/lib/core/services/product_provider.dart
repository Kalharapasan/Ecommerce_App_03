import 'package:flutter/material.dart';
import '../models/product_model.dart';
import '../models/category_model.dart';
import 'api_service.dart';

class ProductProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  
  List<ProductModel> _products = [];
  List<CategoryModel> _categories = [];
  bool _isLoading = false;
  String? _error;

  List<ProductModel> get products => _products;
  List<CategoryModel> get categories => _categories;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchCategories() async {
    _isLoading = true;
    notifyListeners();
    try {
      final response = await _apiService.dio.get('/categories');
      var list = response.data as List;
      _categories = list.map((c) => CategoryModel.fromJson(c)).toList();
    } catch (e) {
      _error = 'Failed to load categories';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchProducts({int? categoryId}) async {
    _isLoading = true;
    notifyListeners();
    try {
      final url = categoryId != null ? '/products/category/$categoryId' : '/products';
      final response = await _apiService.dio.get(url);
      var list = response.data as List;
      _products = list.map((p) => ProductModel.fromJson(p)).toList();
    } catch (e) {
      _error = 'Failed to load products';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> searchProducts(String query) async {
    _isLoading = true;
    notifyListeners();
    try {
      final response = await _apiService.dio.get('/products/search', queryParameters: {'query': query});
      var list = response.data as List;
      _products = list.map((p) => ProductModel.fromJson(p)).toList();
    } catch (e) {
      _error = 'Search failed';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchRecommendations(int productId) async {
    try {
      final response = await _apiService.dio.get('/products');
      var list = (response.data as List).take(4).toList();
      _products = list.map((p) => ProductModel.fromJson(p)).toList();
      notifyListeners();
    } catch (e) {
      _error = 'Failed to load recommendations';
    }
  }
}
