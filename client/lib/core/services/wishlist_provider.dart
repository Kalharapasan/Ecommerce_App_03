import 'package:flutter/material.dart';
import '../models/product_model.dart';

class WishlistProvider with ChangeNotifier {
  final List<ProductModel> _wishlistItems = [];

  List<ProductModel> get items => _wishlistItems;

  bool isWishlisted(int productId) {
    return _wishlistItems.any((item) => item.id == productId);
  }

  void toggleWishlist(ProductModel product) {
    final index = _wishlistItems.indexWhere((item) => item.id == product.id);
    if (index >= 0) {
      _wishlistItems.removeAt(index);
    } else {
      _wishlistItems.add(product);
    }
    notifyListeners();
  }

  void clearWishlist() {
    _wishlistItems.clear();
    notifyListeners();
  }
}
