package com.nestora.realestate.domain.state

/**
 * Modern Jetpack Compose Unified UI State Representation.
 * Completely decouples the Presentation screen rendering from the data layer logic.
 */
sealed interface UiState<out T> {
    object Loading : UiState<Nothing>
    data class Success<out T>(val data: T) : UiState<T>
    object Empty : UiState<Nothing>
    data class Error(val userMessage: String, val throwable: Throwable? = null) : UiState<Nothing>
    object Offline : UiState<Nothing>
}
