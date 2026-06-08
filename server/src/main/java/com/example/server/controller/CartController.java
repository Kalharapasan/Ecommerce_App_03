package com.example.server.controller;

import com.example.server.dto.CartDto;
import com.example.server.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDto> getCart() {
        return ResponseEntity.ok(cartService.getCart());
    }

    @PostMapping("/add")
    public ResponseEntity<CartDto> addToCart(@RequestParam Long productId, @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.addToCart(productId, quantity));
    }

    @PutMapping("/update")
    public ResponseEntity<CartDto> updateQuantity(@RequestParam Long productId, @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(productId, quantity));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<CartDto> removeFromCart(@PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeFromCart(productId));
    }
}
