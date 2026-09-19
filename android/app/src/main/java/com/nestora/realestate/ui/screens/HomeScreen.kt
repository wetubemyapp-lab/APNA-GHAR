package com.nestora.realestate.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.nestora.realestate.domain.model.Property
import com.nestora.realestate.domain.state.UiState
import com.nestora.realestate.presentation.viewmodel.HomeViewModel
import com.nestora.realestate.ui.components.PropertyCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    viewModel: HomeViewModel,
    onPropertyClick: (String) -> Unit,
    onNotificationClick: () -> Unit,
    onProfileClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    val selectedCity by viewModel.selectedCity.collectAsState()
    val listingType by viewModel.listingType.collectAsState()
    val shortlistIds by viewModel.shortlistIds.collectAsState()

    var searchQuery by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "Nestora",
                            fontWeight = FontWeight.Black,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        // City Badge Action
                        Box(
                            modifier = Modifier
                                .background(Color(0xFFF0F2F5), RoundedCornerShape(12.dp))
                                .clickable { /* Change City Trigger */ }
                                .padding(horizontal = 8.dp, py = 4.dp)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = selectedCity,
                                    style = MaterialTheme.typography.labelSmall,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.Black
                                )
                                Icon(
                                    imageVector = Icons.Default.ArrowDropDown,
                                    contentDescription = "Dropdown indicator",
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }
                    }
                },
                actions = {
                    IconButton(onClick = onNotificationClick) {
                        Icon(imageVector = Icons.Default.Notifications, contentDescription = "Alerts Center")
                    }
                    IconButton(onClick = onProfileClick) {
                        Icon(imageVector = Icons.Default.AccountCircle, contentDescription = "User Profile Settings")
                    }
                }
            )
        }
    ) { innerPadding ->
        LazyColumn(
            contentPadding = PaddingValues(bottom = 80.dp),
            modifier = modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp)
        ) {
            // BUY & RENT Toggle Group
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Button(
                        onClick = { viewModel.setListingType("buy") },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (listingType == "buy") MaterialTheme.colorScheme.primary else Color(0xFFF0F2F5),
                            contentColor = if (listingType == "buy") Color.White else Color.Black
                        ),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.weight(1f).height(48.dp)
                    ) {
                        Text("BUY", fontWeight = FontWeight.Bold)
                    }

                    Button(
                        onClick = { viewModel.setListingType("rent") },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (listingType == "rent") MaterialTheme.colorScheme.primary else Color(0xFFF0F2F5),
                            contentColor = if (listingType == "rent") Color.White else Color.Black
                        ),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.weight(1f).height(48.dp)
                    ) {
                        Text("RENT", fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Search Bar Component
            item {
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    placeholder = { Text("Search locality, project, or developer...") },
                    leadingIcon = { Icon(imageVector = Icons.Default.Search, contentDescription = "Search Icon") },
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 16.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = MaterialTheme.colorScheme.primary,
                        unfocusedBorderColor = Color(0xFFE2E8F0)
                    )
                )
            }

            // Popular Categories Rows
            item {
                Text(
                    text = "Explore Property Types",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 10.dp)
                )
                
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.padding(bottom = 20.dp)
                ) {
                    val categories = listOf("Apartments", "Villas", "Plots", "Houses", "Builder Floors")
                    items(categories) { cat ->
                        AssistChip(
                            onClick = { /* Filter property lists */ },
                            label = { Text(cat, fontWeight = FontWeight.SemiBold) },
                            shape = RoundedCornerShape(10.dp)
                        )
                    }
                }
            }

            // Popular Localities
            item {
                Text(
                    text = "Popular Localities",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 10.dp)
                )
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.padding(bottom = 20.dp)
                ) {
                    listOf("Vaishali Nagar", "Jagatpura", "Malviya Nagar", "Mansarovar").forEach { locality ->
                        SuggestionChip(
                            onClick = { searchQuery = locality },
                            label = { Text(locality) }
                        )
                    }
                }
            }

            // Main UI States Logic matching 46 & 51
            when (val state = uiState) {
                is UiState.Loading -> {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(200.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            CircularProgressIndicator()
                        }
                    }
                }
                is UiState.Empty -> {
                    item {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 32.dp)
                        ) {
                            Icon(imageVector = Icons.Default.Info, contentDescription = "No properties available", tint = Color.Gray, modifier = Modifier.size(48.dp))
                            Spacer(modifier = Modifier.height(8.dp))
                            Text("No listings match your selection.", color = Color.Gray)
                        }
                    }
                }
                is UiState.Error -> {
                    item {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 24.dp)
                        ) {
                            Text(state.userMessage, color = Color.Red, fontWeight = FontWeight.Bold)
                            Spacer(modifier = Modifier.height(8.dp))
                            Button(onClick = { viewModel.loadData() }) {
                                Text("Retry Connection")
                            }
                        }
                    }
                }
                is UiState.Success -> {
                    val list = state.data.filter { it.listingType == listingType }
                    item {
                        Text(
                            text = "Featured Listings in $selectedCity",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(vertical = 10.dp)
                        )
                    }
                    items(list, key = { it.id }) { property ->
                        PropertyCard(
                            property = property,
                            isShortlisted = shortlistIds.contains(property.id),
                            onCardClick = { onPropertyClick(property.id) },
                            onShortlistToggle = { viewModel.toggleShortlist(property.id) }
                        )
                    }
                }
                else -> {}
            }
        }
    }
}
