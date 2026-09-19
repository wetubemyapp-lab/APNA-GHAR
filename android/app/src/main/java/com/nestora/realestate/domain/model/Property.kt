package com.nestora.realestate.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Property(
    val id: String,
    val title: String,
    val bhk: String,
    val propertyType: String,
    val price: Double,
    val priceDisplay: String,
    val pricePerSqFt: Double,
    val address: String,
    val locality: String,
    val city: String,
    val reraId: String? = null,
    val isOwnerVerified: Boolean = false,
    val carpetAreaSqFt: Int,
    val superAreaSqFt: Int,
    val bathrooms: Int,
    val balconies: Int,
    val floor: Int,
    val totalFloors: Int,
    val facing: String,
    val furnishing: String,
    val parking: String,
    val description: String,
    val images: List<String>,
    val amenities: List<String>,
    val isFeatured: Boolean = false,
    val listingType: String = "buy", // "buy" or "rent"
    val viewsCount: Int = 120,
    val savedCount: Int = 42
)

@Serializable
data class Project(
    val id: String,
    val name: String,
    val developer: String,
    val locality: String,
    val city: String,
    val priceRange: String,
    val configurations: String,
    val image: String,
    val rating: Float = 4.5f,
    val reraId: String? = null
)

@Serializable
data class User(
    val id: String,
    val name: String,
    val email: String,
    val phone: String,
    val walletBalance: Double = 500.0,
    val userRole: String = "customer"
)

@Serializable
data class ChatMessage(
    val id: String,
    val text: String,
    val senderId: String,
    val timestamp: String
)

@Serializable
data class ChatThread(
    val id: String,
    val propertyId: String,
    val propertyTitle: String,
    val advertiserName: String,
    val advertiserAvatar: String,
    val lastMessage: String,
    val lastUpdated: String,
    val messages: List<ChatMessage> = emptyList()
)

@Serializable
data class NotificationItem(
    val id: String,
    val title: String,
    val message: String,
    val type: String, // "info", "success", "error"
    val isRead: Boolean = false,
    val timestamp: String
)
