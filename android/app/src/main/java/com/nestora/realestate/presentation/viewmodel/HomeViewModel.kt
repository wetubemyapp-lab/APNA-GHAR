package com.nestora.realestate.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nestora.realestate.domain.model.*
import com.nestora.realestate.domain.repository.*
import com.nestora.realestate.domain.state.UiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class HomeViewModel(
    private val propertyRepository: PropertyRepository,
    private val projectRepository: ProjectRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<UiState<List<Property>>>(UiState.Loading)
    val uiState: StateFlow<UiState<List<Property>>> = _uiState.asStateFlow()

    private val _projectsState = MutableStateFlow<UiState<List<Project>>>(UiState.Loading)
    val projectsState: StateFlow<UiState<List<Project>>> = _projectsState.asStateFlow()

    private val _selectedCity = MutableStateFlow("Jaipur")
    val selectedCity: StateFlow<String> = _selectedCity.asStateFlow()

    private val _listingType = MutableStateFlow("buy") // "buy" or "rent"
    val listingType: StateFlow<String> = _listingType.asStateFlow()

    private val _shortlistIds = MutableStateFlow<Set<String>>(emptySet())
    val shortlistIds: StateFlow<Set<String>> = _shortlistIds.asStateFlow()

    init {
        loadData()
    }

    fun loadData() {
        viewModelScope.launch {
            _uiState.value = UiState.Loading
            _projectsState.value = UiState.Loading
            try {
                val properties = propertyRepository.getProperties()
                val projects = projectRepository.getProjects()

                if (properties.isEmpty()) {
                    _uiState.value = UiState.Empty
                } else {
                    _uiState.value = UiState.Success(properties)
                }

                if (projects.isEmpty()) {
                    _projectsState.value = UiState.Empty
                } else {
                    _projectsState.value = UiState.Success(projects)
                }
            } catch (e: Exception) {
                _uiState.value = UiState.Error("Failed to load real estate directory. Please try again.", e)
                _projectsState.value = UiState.Error("Failed to fetch featured RERA builders.", e)
            }
        }
    }

    fun setCity(city: String) {
        _selectedCity.value = city
    }

    fun setListingType(type: String) {
        _listingType.value = type
    }

    fun toggleShortlist(propertyId: String) {
        val current = _shortlistIds.value.toMutableSet()
        if (current.contains(propertyId)) {
            current.remove(propertyId)
        } else {
            current.add(propertyId)
        }
        _shortlistIds.value = current
    }
}
