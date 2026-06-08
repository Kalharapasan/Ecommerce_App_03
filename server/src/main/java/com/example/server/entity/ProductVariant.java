package com.example.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "product_variants")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String name; // e.g., "Color", "Size"

    private String value; // e.g., "Red", "XL"

    private BigDecimal priceAdjustment; // e.g., +5.00

    private Integer stockQuantity;
}
