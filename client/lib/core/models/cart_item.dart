class CartItem {
  final String id;
  final String cartId;
  final String productId;
  final String productName;
  final String productImage;
  final double price;
  final int quantity;
  final DateTime createdAt;

  CartItem({
    required this.id,
    required this.cartId,
    required this.productId,
    required this.productName,
    required this.productImage,
    required this.price,
    required this.quantity,
    required this.createdAt,
  });
}