package com.example.server.service;

import com.example.server.dto.CartDto;
import com.example.server.dto.CartItemDto;
import com.example.server.entity.Cart;
import com.example.server.entity.CartItem;
import com.example.server.entity.Product;
import com.example.server.entity.User;
import com.example.server.repository.CartRepository;
import com.example.server.repository.ProductRepository;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartDto getCart() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
        return mapToDto(cart);
    }

    @Transactional
    public CartDto addToCart(Long productId, Integer quantity) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .build();
            cart.getItems().add(newItem);
        }

        return mapToDto(cartRepository.save(cart));
    }

    @Transactional
    public CartDto updateQuantity(Long productId, Integer quantity) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        if (quantity <= 0) {
            cart.getItems().remove(item);
        } else {
            item.setQuantity(quantity);
        }

        return mapToDto(cartRepository.save(cart));
    }

    @Transactional
    public CartDto removeFromCart(Long productId) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));

        return mapToDto(cartRepository.save(cart));
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private CartDto mapToDto(Cart cart) {
        var items = cart.getItems().stream()
                .map(item -> CartItemDto.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .productPrice(item.getProduct().getPrice().doubleValue())
                        .productImageUrl(item.getProduct().getImageUrls() != null && !item.getProduct().getImageUrls().isEmpty() 
                                ? item.getProduct().getImageUrls().get(0) : null)
                        .quantity(item.getQuantity())
                        .build())
                .collect(Collectors.toList());

        double total = items.stream()
                .mapToDouble(item -> item.getProductPrice() * item.getQuantity())
                .sum();

        return CartDto.builder()
                .id(cart.getId())
                .items(items)
                .totalAmount(total)
                .build();
    }
}
