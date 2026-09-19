package com.nestora.realestate.domain.repository

import com.nestora.realestate.domain.model.*

interface PropertyRepository {
    suspend fun getProperties(): List<Property>
    suspend fun getPropertyById(id: String): Property?
    suspend fun createProperty(property: Property): Property
    suspend fun updateProperty(id: String, updates: Map<String, String>): Boolean
}

interface ProjectRepository {
    suspend fun getProjects(): List<Project>
    suspend fun getProjectById(id: String): Project?
}

interface UserRepository {
    suspend fun getProfile(userId: String): User?
    suspend fun updateProfile(userId: String, name: String, phone: String): Boolean
}

interface MessageRepository {
    suspend fun getAllThreads(): List<ChatThread>
    suspend fun getThreadById(id: String): ChatThread?
    suspend fun sendMessage(threadId: String, text: String, senderId: String): Boolean
}

interface NotificationRepository {
    suspend fun getAllNotifications(): List<NotificationItem>
    suspend fun markAsRead(id: String): Boolean
}
