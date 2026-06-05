class ProductModel {
  final int id;
  final String name;
  final String description;
  final double price;
  final int stockQuantity;
  final List<String> imageUrls;
  final int categoryId;
  final String categoryName;
  final double averageRating;
  final int reviewCount;
  final bool isPopular;
  final bool isUpcoming;
  final double discountPercentage;

  ProductModel({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.stockQuantity,
    required this.imageUrls,
    required this.categoryId,
    required this.categoryName,
    required this.averageRating,
    required this.reviewCount,
    this.isPopular = false,
    this.isUpcoming = false,
    this.discountPercentage = 0,
  });

  double get discountedPrice {
    if (discountPercentage > 0) {
      return price * (1 - discountPercentage / 100);
    }
    return price;
  }

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: json['price'].toDouble(),
      stockQuantity: json['stockQuantity'],
      imageUrls: List<String>.from(json['imageUrls'] ?? []),
      categoryId: json['categoryId'],
      categoryName: json['categoryName'],
      averageRating: (json['averageRating'] ?? 0.0).toDouble(),
      reviewCount: json['reviewCount'] ?? 0,
      isPopular: json['popular'] ?? false,
      isUpcoming: json['upcoming'] ?? false,
      discountPercentage: (json['discountPercentage'] ?? 0.0).toDouble(),
    );
  }
}
