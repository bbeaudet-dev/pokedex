# Pokemon Pokedex Architecture

## 📁 **Project Structure**

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Entries.jsx     # Pokemon entries display
│   ├── Header.jsx      # App header
│   ├── Register.jsx    # Pokemon registration form
│   ├── Sort.jsx        # Filtering and sorting
│   ├── EvolutionTree.jsx # Evolution chain display
│   └── index.js        # Component exports
├── constants/          # Static reference data
│   ├── types.js        # Pokemon types and effectiveness
│   ├── generations.js  # Generation information
│   ├── evolution.js    # Evolution stage constants
│   └── index.js        # Constant exports
├── utils/              # Utility functions
│   ├── formatting.js   # Text formatting utilities
│   ├── types.js        # Type-related utilities
│   ├── generations.js  # Generation utilities
│   ├── api.js          # API URL utilities
│   ├── evolution.js    # Evolution chain utilities
│   └── index.js        # Utility exports
├── services/           # API services
│   └── api.js          # Pokemon API client
├── hooks/              # Custom React hooks
│   ├── usePokemon.js   # Pokemon data management
│   ├── usePokemonFilters.js # Filtering logic
│   ├── usePokemonRegistration.js # Registration form
│   └── index.js        # Hook exports
└── server/             # Backend server
    ├── db.json         # Pokemon database
    ├── server.js       # Express server
    └── generate-db.js  # Database generation script
```

## 🔄 **Data Flow Architecture**

### **1. Data Sources**

#### **Static Reference Data** (`src/constants/`)

- **Purpose**: Static data that doesn't change and is used across the app
- **Examples**: Pokemon types, generations, evolution stages
- **When to use**: For UI rendering, validation, and reference

#### **Dynamic Pokemon Data** (`src/server/db.json`)

- **Purpose**: Individual Pokemon records with stats and descriptions
- **Examples**: Pokemon names, stats, descriptions, evolution stages
- **When to use**: For displaying Pokemon information, filtering, and search

#### **External API Data** (PokeAPI)

- **Purpose**: Real-time data that changes or is too large to store locally
- **Examples**: Images, evolution chains, height/weight, detailed stats
- **When to use**: For additional details, images, and complex data structures

### **2. Data Flow**

```
User Action → Component → Hook → Service → Data Source
     ↓
UI Update ← Component ← Hook ← Service ← Data Source
```

#### **Example: Loading Pokemon Details**

1. **User clicks Pokemon** → `Entries.jsx`
2. **Component calls** → `usePokemon` hook
3. **Hook calls** → `pokemonAPI.getDetails()`
4. **Service fetches** → PokeAPI
5. **Data flows back** → Component renders evolution tree

### **3. Separation of Concerns**

#### **Constants** (`src/constants/`)

- **types.js**: Pokemon types, colors, effectiveness chart
- **generations.js**: Generation info, regions, game lists
- **evolution.js**: Evolution stage names, special categories

#### **Utils** (`src/utils/`)

- **formatting.js**: Text formatting, name normalization
- **types.js**: Type validation, parsing, color utilities
- **generations.js**: Generation lookup and display functions
- **api.js**: URL generation for external APIs
- **evolution.js**: Evolution chain parsing and description generation

#### **Services** (`src/services/`)

- **api.js**: HTTP client for both local server and PokeAPI

## 🎯 **Key Design Principles**

### **1. Single Responsibility**

Each file has one clear purpose:

- `types.js` = Type-related data and functions
- `formatting.js` = Text formatting only
- `api.js` = API communication only

### **2. Separation of Data Sources**

- **Constants**: Static reference data
- **Server DB**: Curated Pokemon records
- **External APIs**: Dynamic/real-time data

### **3. Lazy Loading**

- Basic Pokemon data loads immediately
- Detailed data (evolution chains, images) loads on demand
- Reduces initial load time and API calls

### **4. Error Handling**

- Graceful fallbacks for missing data
- Loading states for async operations
- Console logging for debugging

## 🔧 **Usage Examples**

### **Adding a New Pokemon Type**

```javascript
// constants/types.js
export const TYPES = {
  newtype: {
    name: "New Type",
    icon: "path/to/icon.svg",
    color: "#FF0000",
    description: "Description here",
  },
};
```

### **Adding a New Utility Function**

```javascript
// utils/formatting.js
export const formatNewData = (data) => {
  // Format logic here
};
```

### **Adding a New API Endpoint**

```javascript
// services/api.js
export const pokemonAPI = {
  getNewData: async (pokemonName) => {
    // API call logic here
  },
};
```

## 🚀 **Benefits of This Architecture**

1. **Maintainability**: Easy to find and modify specific functionality
2. **Scalability**: New features can be added without affecting existing code
3. **Performance**: Lazy loading and efficient data fetching
4. **Testability**: Pure functions and clear separation of concerns
5. **Reusability**: Utilities and components can be easily reused
6. **Debugging**: Clear data flow and error handling

## 📊 **Data Source Comparison**

| Data Source   | Purpose         | Update Frequency | Size   | Use Case                 |
| ------------- | --------------- | ---------------- | ------ | ------------------------ |
| **Constants** | Reference data  | Never            | Small  | UI rendering, validation |
| **Server DB** | Pokemon records | Manual           | Medium | Core Pokemon data        |
| **PokeAPI**   | Dynamic data    | Real-time        | Large  | Images, evolution chains |

This architecture ensures that each piece of data is stored in the most appropriate location and accessed efficiently when needed.
