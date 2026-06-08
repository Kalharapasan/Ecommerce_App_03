package com.example.server.service;

import com.example.server.dto.ReviewDto;
import com.example.server.entity.Product;
import com.example.server.entity.Review;
import com.example.server.entity.User;
import com.example.server.repository.ProductRepository;
import com.example.server.repository.ReviewRepository;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ReviewDto addReview(Long productId, ReviewDto reviewDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = Review.builder()
                .rating(reviewDto.getRating())
                .comment(reviewDto.getComment())
                .user(user)
                .product(product)
                .createdAt(LocalDateTime.now())
                .build();

        return mapToDto(reviewRepository.save(review));
    }

    public List<ReviewDto> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private ReviewDto mapToDto(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .userName(review.getUser().getFirstName() + " " + review.getUser().getLastName())
                .createdAt(review.getCreatedAt())
                .productId(review.getProduct().getId())
                .build();
    }
}
