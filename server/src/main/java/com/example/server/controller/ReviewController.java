package com.example.server.controller;

import com.example.server.dto.ReviewDto;
import com.example.server.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/product/{productId}")
    public ResponseEntity<ReviewDto> addReview(@PathVariable Long productId, @RequestBody ReviewDto reviewDto) {
        return ResponseEntity.ok(reviewService.addReview(productId, reviewDto));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDto>> getReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId));
    }
}
