import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Copy, 
  Check, 
  Smartphone, 
  Layers, 
  Sparkles,
  FileCode
} from 'lucide-react';

interface ComposeInspectorModalProps {
  onClose: () => void;
}

export const ComposeInspectorModal: React.FC<ComposeInspectorModalProps> = ({ onClose }) => {
  const [activeFile, setActiveFile] = useState<'architecture' | 'card' | 'screen' | 'theme' | 'viewmodel'>('architecture');
  const [copied, setCopied] = useState(false);

  const codeSnippets: Record<string, string> = {
    architecture: `// ==========================================
// 🏗️ Nestora Jetpack Compose Clean Architecture
// Adheres strictly to Domain-Driven Design (DDD) with a decoupled mock/backend repository system.
// ==========================================

// 📂 Android Module Structure
// ├── 📂 data/                           # Repositories & Local/Remote datasources
// │   ├── 📂 repository/                 # Mock & API Implementations (MockPropertyRepository, etc.)
// │   ├── 📂 remote/                     # Ktor REST Client & API payloads
// │   └── 📂 local/                      # Room Database local cache & DataStore preferences
// ├── 📂 domain/                         # Core Entities, Repo Contracts & UseCases
// │   ├── 📂 model/                      # Immutable Data Classes
// │   ├── 📂 repository/                 # Interface Abstractions
// │   └── 📂 usecase/                    # Single-purpose self-contained operations
// ├── 📂 presentation/                   # Reactive UI Presenters & MVI / MVVM ViewModels
// │   ├── 📂 state/                      # Unified Sealed UIState models
// └── 📂 navigation/                      # Safe Compose Navigation Graph Destinations

// ==========================================
// 🎨 1. UNIFIED UI STATE ARCHETYPE (M3)
// ==========================================
sealed interface UiState<out T> {
    object Loading : UiState<Nothing>
    data class Success<out T>(val data: T) : UiState<T>
    object Empty : UiState<Nothing>
    data class Error(val exception: Throwable, val userMessage: String) : UiState<Nothing>
    object Offline : UiState<Nothing>
}

// ==========================================
// 🗺️ 2. COMPOSE NAVIGATION GRAPH ROUTES
// ==========================================
sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Search : Screen("search")
    object Results : Screen("results")
    object PropertyDetail : Screen("property/{id}") {
        fun createRoute(id: String) = "property/$id"
    }
    object ProjectDetail : Screen("project/{id}") {
        fun createRoute(id: String) = "project/$id"
    }
    object LocalityDetail : Screen("locality/{id}") {
        fun createRoute(id: String) = "locality/$id"
    }
    object MapExplorer : Screen("map")
    object Shortlist : Screen("shortlist")
    object CompareListings : Screen("compare")
    object ContactAdvertiser : Screen("contact/{id}") {
        fun createRoute(id: String) = "contact/$id"
    }
    object RequestCallback : Screen("callback/{id}") {
        fun createRoute(id: String) = "callback/$id"
    }
    object Login : Screen("login")
    object Register : Screen("register")
    object OtpVerification : Screen("otp")
    object PostProperty : Screen("post-property")
    object MyListings : Screen("my-listings")
    object EditListing : Screen("edit-listing/{id}") {
        fun createRoute(id: String) = "edit-listing/$id"
    }
    object MessagesHub : Screen("messages")
    object ChatRoom : Screen("chat/{id}") {
        fun createRoute(id: String) = "chat/$id"
    }
    object NotificationsList : Screen("notifications")
    object AccountSettings : Screen("account")
    object GeneralSettings : Screen("settings")
    object HelpCenter : Screen("help")
    object LegalCompliance : Screen("legal")
}

// ==========================================
// 🗄️ 3. DECOUPLED BACKEND-READY REPOSITORIES
// ==========================================
interface PropertyRepository {
    suspend fun getProperties(): List<Property>
    suspend fun getProperty(id: String): Property?
    suspend fun publishProperty(property: Property): Boolean
}

interface ProjectRepository {
    suspend fun getProjects(): List<Project>
    suspend fun getProject(id: String): Project?
}

interface UserRepository {
    suspend fun getProfile(userId: String): User?
    suspend fun updateProfile(userId: String, user: User): Boolean
}

interface MessageRepository {
    suspend fun getChats(): List<ChatThread>
}

interface NotificationRepository {
    suspend fun getNotifications(): List<NotificationItem>
}

// Concrete Prototype Implementations (easily swapped with Firebase/Supabase/REST later)
class MockPropertyRepository : PropertyRepository { ... }
class MockProjectRepository : ProjectRepository { ... }
class MockUserRepository : UserRepository { ... }
class MockMessageRepository : MessageRepository { ... }
class MockNotificationRepository : NotificationRepository { ... }`,
    card: `package com.nestora.realestate.ui.components

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.outlined.FavoriteBorder
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.nestora.realestate.domain.model.Property

/**
 * Material 3 Property Card for Indian Real-Estate Discovery.
 * Follows Nestora Design System tokens with zero-brokerage badges and instant visit CTA.
 */
@Composable
fun PropertyCard(
    property: Property,
    isSaved: Boolean,
    onSaveToggle: () -> Unit,
    onCardClick: () -> Unit,
    onScheduleVisit: () -> Unit,
    modifier: Modifier = Modifier
) {
    ElevatedCard(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onCardClick() },
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.elevatedCardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp)
    ) {
        Column {
            // Media Container with Gradient Scrim and Badges
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
            ) {
                AsyncImage(
                    model = property.images.firstOrNull(),
                    contentDescription = property.title,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )

                // Top badges
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    if (property.isZeroBrokerage) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = Color(0xFF2E9D63)
                        ) {
                            Text(
                                text = "ZERO BROKERAGE",
                                color = Color.White,
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.ExtraBold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                    }

                    IconButton(
                        onClick = onSaveToggle,
                        modifier = Modifier
                            .background(Color.Black.copy(alpha = 0.4f), shape = RoundedCornerShape(50))
                            .size(36.dp)
                    ) {
                        Icon(
                            imageVector = if (isSaved) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                            contentDescription = "Save Property",
                            tint = if (isSaved) Color(0xFFE91E63) else Color.White
                        )
                    }
                }
            }

            // Specs & Details Section
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = property.priceDisplay,
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Black,
                    color = MaterialTheme.colorScheme.primary
                )

                Text(
                    text = property.title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.LocationOn,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(16.dp)
                    )
                    Text(
                        text = "\${property.locality}, \${property.city}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Divider(modifier = Modifier.padding(vertical = 4.dp))

                // Bottom Action CTA
                Button(
                    onClick = onScheduleVisit,
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(14.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.primary
                    )
                ) {
                    Text(text = "Schedule Free Site Visit", fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}`,
    theme: `package com.nestora.realestate.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val NestoraPrimary = Color(0xFF3949AB)
val NestoraPrimaryDark = Color(0xFF283593)
val NestoraAccent = Color(0xFFF4A62A)
val NestoraBackground = Color(0xFFF7F8FA)
val NestoraSurface = Color(0xFFFFFFFF)
val NestoraSuccess = Color(0xFF2E9D63)
val NestoraError = Color(0xFFD64545)

private val LightColorScheme = lightColorScheme(
    primary = NestoraPrimary,
    onPrimary = Color.White,
    primaryContainer = Color(0xFFE8EAF6),
    onPrimaryContainer = NestoraPrimaryDark,
    secondary = NestoraAccent,
    onSecondary = Color(0xFF1C1B1F),
    background = NestoraBackground,
    surface = NestoraSurface,
    onSurface = Color(0xFF1C1B1F),
    error = NestoraError
)

@Composable
fun NestoraRealEstateTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = NestoraTypography,
        shapes = NestoraShapes,
        content = content
    )
}`,
    viewmodel: `package com.nestora.realestate.ui.discovery

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nestora.realestate.domain.model.Property
import com.nestora.realestate.domain.repository.PropertyRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class DiscoveryUiState(
    val properties: List<Property> = emptyList(),
    val filteredProperties: List<Property> = emptyList(),
    val selectedCity: String = "Bengaluru",
    val searchQuery: String = "",
    val selectedBhk: Set<String> = emptySet(),
    val isZeroBrokerageOnly: Boolean = false,
    val isLoading: Boolean = false
)

class DiscoveryViewModel(
    private val repository: PropertyRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(DiscoveryUiState())
    val uiState: StateFlow<DiscoveryUiState> = _uiState.asStateFlow()

    init {
        loadProperties()
    }

    fun onSearchQueryChanged(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
        applyFilters()
    }

    fun toggleBhkFilter(bhk: String) {
        _uiState.update { state ->
            val updated = if (state.selectedBhk.contains(bhk)) {
                state.selectedBhk - bhk
            } else {
                state.selectedBhk + bhk
            }
            state.copy(selectedBhk = updated)
        }
        applyFilters()
    }

    private fun applyFilters() {
        val state = _uiState.value
        val filtered = state.properties.filter { prop ->
            (state.searchQuery.isEmpty() || prop.title.contains(state.searchQuery, ignoreCase = true)) &&
            (state.selectedBhk.isEmpty() || state.selectedBhk.contains(prop.bhk)) &&
            (!state.isZeroBrokerageOnly || prop.isZeroBrokerage)
        }
        _uiState.update { it.copy(filteredProperties = filtered) }
    }
}`              ,
    screen: `package com.nestora.realestate.presentation.discovery

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.nestora.realestate.ui.components.PropertyCard

/**
 * Jetpack Compose Screen utilizing modern Material 3 Scaffold and StateFlow collection.
 * Renders the primary discovery feed with search integration and property lists.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DiscoveryScreen(
    viewModel: DiscoveryViewModel,
    onPropertyClick: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()

    Scaffold(
        topBar = {
            SearchBar(
                query = uiState.searchQuery,
                onQueryChange = { viewModel.onSearchQueryChanged(it) },
                onSearch = {},
                active = false,
                onActiveChange = {},
                placeholder = { Text("Search localities, builders, apartments...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {}
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = modifier
                .fillMaxSize()
                .padding(innerPadding),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Text(
                    text = "Recommended Properties in \${uiState.selectedCity}",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onBackground
                )
            }

            items(uiState.filteredProperties) { property ->
                PropertyCard(
                    property = property,
                    isSaved = false,
                    onSaveToggle = { /* Toggle saved state */ },
                    onCardClick = { onPropertyClick(property.id) },
                    onScheduleVisit = { /* Request instant site visit */ }
                )
            }
        }
    }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-950 text-slate-100 w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] border border-slate-800">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
                Android Jetpack Compose Architecture
              </h2>
              <p className="text-[11px] text-slate-400">Production Kotlin Material 3 code structure</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab File Selector */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-900 text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFile('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              activeFile === 'architecture' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture.md</span>
          </button>

          <button
            onClick={() => setActiveFile('card')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              activeFile === 'card' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>PropertyCard.kt</span>
          </button>

          <button
            onClick={() => setActiveFile('screen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              activeFile === 'screen' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>DiscoveryScreen.kt</span>
          </button>

          <button
            onClick={() => setActiveFile('theme')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              activeFile === 'theme' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Theme.kt</span>
          </button>

          <button
            onClick={() => setActiveFile('viewmodel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              activeFile === 'viewmodel' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>DiscoveryViewModel.kt</span>
          </button>
        </div>

        {/* Syntax Code Container */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-indigo-200/90 leading-relaxed bg-slate-950">
          <pre className="whitespace-pre overflow-x-auto">
            <code>{codeSnippets[activeFile]}</code>
          </pre>
        </div>

      </div>
    </div>
  );
};
