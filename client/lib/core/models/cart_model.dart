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