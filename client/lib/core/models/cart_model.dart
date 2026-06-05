class CartItem {
  final int id;
  final int productId;
  final String productName;
  final double productPrice;
  final String? productImageUrl;
  int quantity;

  CartItem({
    required this.id,
    required this.productId,
    required this.productName,
    required this.productPrice,
    this.productImageUrl,
    required this.quantity,
  });

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      id: json['id'],
      productId: json['productId'],
      productName: json['productName'],
      productPrice: json['productPrice'].toDouble(),
      productImageUrl: json['productImageUrl'],
      quantity: json['quantity'],
    );
  }
}

class Cart {
  final int id;
  final List<CartItem> items;
  final double totalAmount;

  Cart({
    required this.id,
    required this.items,
    required this.totalAmount,
  });

  factory Cart.fromJson(Map<String, dynamic> json) {
    var list = json['items'] as List;
    List<CartItem> itemsList = list.map((i) => CartItem.fromJson(i)).toList();

    return Cart(
      id: json['id'],
      items: itemsList,
      totalAmount: json['totalAmount'].toDouble(),
    );
  }
}