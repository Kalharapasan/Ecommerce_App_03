class OrderItem {
  final int id;
  final int productId;
  final String productName;
  final int quantity;
  final double price;

  OrderItem({
    required this.id,
    required this.productId,
    required this.productName,
    required this.quantity,
    required this.price,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: json['id'],
      productId: json['productId'],
      productName: json['productName'],
      quantity: json['quantity'],
      price: json['price'].toDouble(),
    );
  }
}

class OrderModel {
  final int id;
  final DateTime orderDate;
  final String status;
  final double totalAmount;
  final String shippingAddress;
  final String phoneNumber;
  final List<OrderItem> items;

  OrderModel({
    required this.id,
    required this.orderDate,
    required this.status,
    required this.totalAmount,
    required this.shippingAddress,
    required this.phoneNumber,
    required this.items,
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) {
    var list = json['items'] as List;
    List<OrderItem> itemsList = list.map((i) => OrderItem.fromJson(i)).toList();

    return OrderModel(
      id: json['id'],
      orderDate: DateTime.parse(json['orderDate']),
      status: json['status'],
      totalAmount: json['totalAmount'].toDouble(),
      shippingAddress: json['shippingAddress'],
      phoneNumber: json['phoneNumber'],
      items: itemsList,
    );
  }
}
