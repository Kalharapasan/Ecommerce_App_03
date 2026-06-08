package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDto {
    private long totalProducts;
    private long totalCategories;
    private long totalOrders;
    private double totalRevenue;
    private double averageOrderValue;
    private Map<String, Long> salesByCategory;
    private Map<String, Double> salesProjections;
    private List<OrderDto> recentOrders;
}
