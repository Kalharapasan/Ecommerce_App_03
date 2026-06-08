package com.example.server.service;

import com.example.server.dto.DashboardStatsDto;
import com.example.server.dto.OrderDto;
import com.example.server.entity.Order;
import com.example.server.repository.CategoryRepository;
import com.example.server.repository.OrderRepository;
import com.example.server.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService;

    public DashboardStatsDto getStats() {
        long totalProducts = productRepository.count();
        long totalCategories = categoryRepository.count();
        long totalOrders = orderRepository.count();
        
        List<Order> allOrders = orderRepository.findAll();
        double totalRevenue = allOrders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();
        
        double averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        Map<String, Long> salesByCategory = allOrders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .collect(Collectors.groupingBy(
                        item -> item.getProduct().getCategory().getName(),
                        Collectors.counting()
                ));

        List<OrderDto> recentOrders = orderRepository.findAll(
                PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "orderDate"))
        ).getContent().stream()
                .map(orderService::mapToDto)
                .collect(Collectors.toList());

        Map<String, Double> projections = Map.of(
                "August", totalRevenue * 1.1,
                "September", totalRevenue * 1.2,
                "October", totalRevenue * 1.5
        );

        return DashboardStatsDto.builder()
                .totalProducts(totalProducts)
                .totalCategories(totalCategories)
                .totalOrders(totalOrders)
                .totalRevenue(totalRevenue)
                .averageOrderValue(averageOrderValue)
                .salesByCategory(salesByCategory)
                .salesProjections(projections)
                .recentOrders(recentOrders)
                .build();
    }
}
