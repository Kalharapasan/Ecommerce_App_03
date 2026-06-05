class Order {
  final String id;
  final String orderNumber;
  final String userId;
  final double subtotal;
  final double taxAmount;
  final double shippingAmount;
  final double discountAmount;
  final double totalAmount;
  final String status;
  final String paymentStatus;
  final String? shippingAddress;
  final DateTime createdAt;

  Order({
    required this.id,
    required this.orderNumber,
    required this.userId,
    required this.subtotal,
    this.taxAmount = 0,
    this.shippingAmount = 0,
    this.discountAmount = 0,
    required this.totalAmount,
    required this.status,
    required this.paymentStatus,
    this.shippingAddress,
    required this.createdAt,
  });

  
}
