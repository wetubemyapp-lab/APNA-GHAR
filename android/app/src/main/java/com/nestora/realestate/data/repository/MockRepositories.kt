package com.nestora.realestate.data.repository

import com.nestora.realestate.domain.model.*
import com.nestora.realestate.domain.repository.*
import kotlinx.coroutines.delay

class MockPropertyRepository : PropertyRepository {
    private val properties = mutableListOf(
        Property(
            id = "prop_1",
            title = "Sunridge Residency Flat",
            bhk = "2 BHK",
            propertyType = "apartment",
            price = 4250000.0,
            priceDisplay = "₹42.5 Lakh",
            pricePerSqFt = 3935.0,
            address = "Sector 3, Mansarovar, Jaipur",
            locality = "Mansarovar",
            city = "Jaipur",
            reraId = "RAJ/P/2026/8942",
            isOwnerVerified = true,
            carpetAreaSqFt = 880,
            superAreaSqFt = 1080,
            bathrooms = 2,
            balconies = 1,
            floor = 4,
            totalFloors = 8,
            facing = "East",
            furnishing = "Semi Furnished",
            parking = "1 Car Covered",
            description = "Comfortable, ready-to-move-in apartment nestled in the prime locality of Mansarovar, Jaipur. Features excellent cross-ventilation, top-tier society security, and dedicated covered car parking.",
            images = listOf(
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80"
            ),
            amenities = listOf("Parking", "Lift", "Security", "Garden", "Power Backup"),
            isFeatured = true,
            listingType = "buy"
        ),
        Property(
            id = "prop_2",
            title = "Aranya Greens Premium Villa",
            bhk = "3 BHK",
            propertyType = "villa",
            price = 8600000.0,
            priceDisplay = "₹86 Lakh",
            pricePerSqFt = 4914.0,
            address = "Sector 10, Ajmer Road, Jaipur",
            locality = "Ajmer Road",
            city = "Jaipur",
            reraId = "RAJ/P/2025/1104",
            isOwnerVerified = true,
            carpetAreaSqFt = 1450,
            superAreaSqFt = 1750,
            bathrooms = 3,
            balconies = 2,
            floor = 1,
            totalFloors = 2,
            facing = "North-East",
            furnishing = "Unfurnished",
            parking = "2 Cars Covered",
            description = "Luxurious independent duplex villa featuring premium modular specifications, sprawling green manicured lawns, and robust multi-tier gated community protection on Ajmer Road, Jaipur.",
            images = listOf(
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
            ),
            amenities = listOf("Parking", "Gym", "Garden", "Security", "Water Softener"),
            isFeatured = true,
            listingType = "buy"
        ),
        Property(
            id = "prop_3",
            title = "Urban Nest Plot",
            bhk = "Residential Plot",
            propertyType = "plot",
            price = 3100000.0,
            priceDisplay = "₹31 Lakh",
            pricePerSqFt = 2583.0,
            address = "Jagatpura Elite Zone, Jaipur",
            locality = "Jagatpura",
            city = "Jaipur",
            reraId = "RAJ/P/2026/4122",
            isOwnerVerified = false,
            carpetAreaSqFt = 1200,
            superAreaSqFt = 1200,
            bathrooms = 0,
            balconies = 0,
            floor = 0,
            totalFloors = 0,
            facing = "West",
            furnishing = "Unfurnished",
            parking = "Street Parking",
            description = "Excellent high-growth residential plot with east/west road parameters in Jagatpura, Jaipur. Perfect layout for instant custom villa development and fast value appreciation.",
            images = listOf(
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80"
            ),
            amenities = listOf("Boundary Wall", "Water Connection", "Power Supply"),
            isFeatured = true,
            listingType = "buy"
        )
    )

    override suspend fun getProperties(): List<Property> {
        delay(600)
        return properties
    }

    override suspend fun getPropertyById(id: String): Property? {
        delay(400)
        return properties.find { it.id == id }
    }

    override suspend fun createProperty(property: Property): Property {
        delay(1000)
        properties.add(property)
        return property
    }

    override suspend fun updateProperty(id: String, updates: Map<String, String>): Boolean {
        delay(800)
        return true
    }
}

class MockProjectRepository : ProjectRepository {
    private val projects = listOf(
        Project(
            id = "proj_1",
            name = "Eldorado Greens Phase II",
            developer = "Eldorado Builders",
            locality = "Mansarovar",
            city = "Jaipur",
            priceRange = "₹38L - ₹75L",
            configurations = "2, 3 BHK Apartments",
            image = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
            reraId = "RAJ/P/2026/7212"
        ),
        Project(
            id = "proj_2",
            name = "Royal Palms Residency",
            developer = "Royal Group",
            locality = "Vaishali Nagar",
            city = "Jaipur",
            priceRange = "₹92L - ₹1.8Cr",
            configurations = "3, 4 BHK Luxury Flats",
            image = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
            reraId = "RAJ/P/2026/1209"
        )
    )

    override suspend fun getProjects(): List<Project> {
        delay(600)
        return projects
    }

    override suspend fun getProjectById(id: String): Project? {
        delay(400)
        return projects.find { it.id == id }
    }
}

class MockUserRepository : UserRepository {
    private var currentUser = User("user_99", "Amit Sharma", "amit@test.com", "9876543210", 500.0)

    override suspend fun getProfile(userId: String): User? {
        delay(500)
        return currentUser
    }

    override suspend fun updateProfile(userId: String, name: String, phone: String): Boolean {
        delay(800)
        currentUser = currentUser.copy(name = name, phone = phone)
        return true
    }
}

class MockMessageRepository : MessageRepository {
    private val threads = mutableListOf(
        ChatThread(
            id = "thread_1",
            propertyId = "prop_1",
            propertyTitle = "Sunridge Residency Flat",
            advertiserName = "Rajesh Gupta (Builder)",
            advertiserAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            lastMessage = "Is this Sunday convenient for site visits?",
            lastUpdated = "10:30 AM",
            messages = listOf(
                ChatMessage("m1", "Hello! Is this flat still vacant?", "user_99", "10:15 AM"),
                ChatMessage("m2", "Yes, fully active! We welcome direct client viewings.", "prop_owner", "10:20 AM"),
                ChatMessage("m3", "Is this Sunday convenient for site visits?", "prop_owner", "10:30 AM")
            )
        )
    )

    override suspend fun getAllThreads(): List<ChatThread> {
        delay(600)
        return threads
    }

    override suspend fun getThreadById(id: String): ChatThread? {
        delay(400)
        return threads.find { it.id == id }
    }

    override suspend fun sendMessage(threadId: String, text: String, senderId: String): Boolean {
        delay(300)
        val thread = threads.find { it.id == threadId } ?: return false
        val newMsg = ChatMessage("msg_${System.currentTimeMillis()}", text, senderId, "Just Now")
        val updatedMsgs = thread.messages + newMsg
        threads.remove(thread)
        threads.add(thread.copy(messages = updatedMsgs, lastMessage = text, lastUpdated = "Just Now"))
        return true
    }
}

class MockNotificationRepository : NotificationRepository {
    private val notifications = mutableListOf(
        NotificationItem("n1", "RERA Verify Verified!", "Your new listing has been approved and marked RERA verified.", "success", false, "2 Hours Ago"),
        NotificationItem("n2", "Offer Received!", "A prospective buyer registered an interest on Sunridge Residency.", "info", false, "1 Day Ago")
    )

    override suspend fun getAllNotifications(): List<NotificationItem> {
        delay(500)
        return notifications
    }

    override suspend fun markAsRead(id: String): Boolean {
        delay(200)
        val index = notifications.indexOfFirst { it.id == id }
        if (index != -1) {
            notifications[index] = notifications[index].copy(isRead = true)
        }
        return true
    }
}
