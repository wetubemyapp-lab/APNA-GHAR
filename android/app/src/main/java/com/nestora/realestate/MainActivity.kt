package com.nestora.realestate

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.nestora.realestate.data.repository.*
import com.nestora.realestate.presentation.viewmodel.HomeViewModel
import com.nestora.realestate.ui.screens.HomeScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Instantiate mock repository layers representing decoupled contracts
        val propertyRepo = MockPropertyRepository()
        val projectRepo = MockProjectRepository()

        setContent {
            MaterialTheme(
                colorScheme = lightColorScheme(
                    primary = Color(0xFF3949AB),
                    secondary = Color(0xFFF4A62A),
                    background = Color(0xFFFAFAFA),
                    surface = Color.White
                )
            ) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    val homeViewModel = HomeViewModel(propertyRepo, projectRepo)

                    var currentTab by remember { mutableStateOf("home") }

                    Scaffold(
                        bottomBar = {
                            NavigationBar {
                                NavigationBarItem(
                                    selected = currentTab == "home",
                                    onClick = {
                                        currentTab = "home"
                                        navController.navigate("home") {
                                            popUpTo("home") { saveState = true }
                                            launchSingleTop = true
                                        }
                                    },
                                    icon = { Icon(Icons.Default.Home, contentDescription = "Home Hub") },
                                    label = { Text("Home") }
                                )
                                NavigationBarItem(
                                    selected = currentTab == "search",
                                    onClick = {
                                        currentTab = "search"
                                        navController.navigate("search")
                                    },
                                    icon = { Icon(Icons.Default.Search, contentDescription = "Property Search") },
                                    label = { Text("Search") }
                                )
                                NavigationBarItem(
                                    selected = currentTab == "shortlist",
                                    onClick = {
                                        currentTab = "shortlist"
                                        navController.navigate("shortlist")
                                    },
                                    icon = { Icon(Icons.Default.Favorite, contentDescription = "Saved Shortlists") },
                                    label = { Text("Shortlist") }
                                )
                                NavigationBarItem(
                                    selected = currentTab == "messages",
                                    onClick = {
                                        currentTab = "messages"
                                        navController.navigate("messages")
                                    },
                                    icon = { Icon(Icons.Default.Mail, contentDescription = "Chat thread Hub") },
                                    label = { Text("Messages") }
                                )
                                NavigationBarItem(
                                    selected = currentTab == "account",
                                    onClick = {
                                        currentTab = "account"
                                        navController.navigate("account")
                                    },
                                    icon = { Icon(Icons.Default.AccountCircle, contentDescription = "User Settings") },
                                    label = { Text("Account") }
                                )
                            }
                        }
                    ) { innerPadding ->
                        NavHost(
                            navController = navController,
                            startDestination = "home",
                            modifier = Modifier.padding(innerPadding)
                        ) {
                            composable("home") {
                                HomeScreen(
                                    viewModel = homeViewModel,
                                    onPropertyClick = { id ->
                                        navController.navigate("property/$id")
                                    },
                                    onNotificationClick = {
                                        navController.navigate("notifications")
                                    },
                                    onProfileClick = {
                                        navController.navigate("account")
                                    }
                                )
                            }

                            composable("search") {
                                // Placeholder showing search details mapping search requirements
                                Text("Dynamic Filter Search Results Screen active.", modifier = Modifier.padding(24.dp))
                            }

                            composable("shortlist") {
                                Text("Saved Shortlists & Comparisons grid active.", modifier = Modifier.padding(24.dp))
                            }

                            composable("messages") {
                                Text("Advertiser Chat Threads active.", modifier = Modifier.padding(24.dp))
                            }

                            composable("account") {
                                Text("User Account Settings & Theme preferences active.", modifier = Modifier.padding(24.dp))
                            }

                            composable("notifications") {
                                Text("Notifications Alerts feed active.", modifier = Modifier.padding(24.dp))
                            }

                            composable(
                                route = "property/{id}",
                                arguments = listOf(navArgument("id") { type = NavType.StringType })
                            ) { backStackEntry ->
                                val propertyId = backStackEntry.arguments?.getString("id") ?: ""
                                Text("Property Detail View for ID: $propertyId loaded.", modifier = Modifier.padding(24.dp))
                            }
                        }
                    }
                }
            }
        }
    }
}
