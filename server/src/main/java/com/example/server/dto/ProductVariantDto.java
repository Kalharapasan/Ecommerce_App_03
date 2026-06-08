package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantDto {
    private Long id;
    private String name;
    private String value;
    private BigDecimal priceAdjustment;
    private Integer stockQuantity;
}
