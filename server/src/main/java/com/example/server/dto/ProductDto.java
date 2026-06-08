package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private List<String> imageUrls;
    private boolean isPopular;
    private boolean isUpcoming;
    private double discountPercentage;
    private Long categoryId;
    private String categoryName;
    private List<ProductVariantDto> variants;
    private Double averageRating;
    private Integer reviewCount;
}
