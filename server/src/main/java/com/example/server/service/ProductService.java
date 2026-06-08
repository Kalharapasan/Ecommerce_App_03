package com.example.server.service;

import com.example.server.dto.ProductDto;
import com.example.server.dto.ProductVariantDto;
import com.example.server.entity.Category;
import com.example.server.entity.Product;
import com.example.server.entity.Review;
import com.example.server.repository.CategoryRepository;
import com.example.server.repository.ProductRepository;
import com.example.server.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<ProductDto> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProductDto createProduct(ProductDto productDto) {
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .name(productDto.getName())
                .description(productDto.getDescription())
                .price(productDto.getPrice())
                .stockQuantity(productDto.getStockQuantity())
                .imageUrls(productDto.getImageUrls())
                .isPopular(productDto.isPopular())
                .isUpcoming(productDto.isUpcoming())
                .discountPercentage(productDto.getDiscountPercentage())
                .category(category)
                .build();

        return mapToDto(productRepository.save(product));
    }

    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStockQuantity(productDto.getStockQuantity());
        product.setImageUrls(productDto.getImageUrls());
        product.setPopular(productDto.isPopular());
        product.setUpcoming(productDto.isUpcoming());
        product.setDiscountPercentage(productDto.getDiscountPercentage());
        product.setCategory(category);

        return mapToDto(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    private ProductDto mapToDto(Product product) {
        double averageRating = product.getReviews() != null && !product.getReviews().isEmpty()
                ? product.getReviews().stream().mapToInt(Review::getRating).average().orElse(0.0)
                : 0.0;

        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .imageUrls(product.getImageUrls())
                .isPopular(product.isPopular())
                .isUpcoming(product.isUpcoming())
                .discountPercentage(product.getDiscountPercentage())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .averageRating(averageRating)
                .reviewCount(product.getReviews() != null ? product.getReviews().size() : 0)
                .variants(product.getVariants() != null ? product.getVariants().stream()
                        .map(v -> ProductVariantDto.builder()
                                .id(v.getId())
                                .name(v.getName())
                                .value(v.getValue())
                                .priceAdjustment(v.getPriceAdjustment())
                                .stockQuantity(v.getStockQuantity())
                                .build())
                        .collect(Collectors.toList()) : List.of())
                .build();
    }
}
