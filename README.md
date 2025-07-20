# Ben's Pokedex

A modern Pokemon Pokedex application built with React, Tailwind CSS, and Express.js.

## Project Structure

```
pokedex/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx      # Header with speaker and pokeball
│   │   ├── Sort.jsx        # Type filtering and sorting
│   │   ├── Register.jsx    # New Pokemon registration form
│   │   └── Entries.jsx     # Pokemon list display
│   ├── server/             # Express.js backend
│   │   ├── server.js       # Main server file
│   │   ├── db.json         # Pokemon database
│   │   └── generate-db.js  # Database generation script
│   ├── App.jsx             # Main React component
│   ├── main.jsx            # React entry point
│   ├── index.css           # Global styles with Tailwind
│   └── assets/             # Static assets
├── public/                 # Public assets
├── package.json            # Unified dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── postcss.config.js       # PostCSS configuration
```

## Features

- **Modern UI**: Built with React and Tailwind CSS
- **Type Filtering**: Filter Pokemon by type with exact or partial matching
- **Evolution Stages**: Filter by evolution stage (Base, Middle, Final, None)
- **Special Categories**: Filter by Legendary, Mythical, or Pseudo-Legendary
- **Audio**: Play Pokemon cries when clicking on entries
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Live filtering and sorting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

This will start:

- Frontend: http://localhost:5173
- Backend: http://localhost:3333

### Production

Build the frontend:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:client` - Start only the frontend development server
- `npm run dev:server` - Start only the backend development server
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Architecture

The application follows a modern monorepo structure with:

- **Frontend**: React with Vite, Tailwind CSS for styling
- **Backend**: Express.js REST API
- **Database**: JSON file-based storage
- **Build Tool**: Vite for fast development and optimized builds

## Component Structure

- **Header**: Contains the speaker icon, pokeball logo, and title
- **Sort**: Handles all filtering and sorting functionality
- **Register**: Form for adding new Pokemon entries
- **Entries**: Displays the filtered list of Pokemon

This modular structure makes the codebase maintainable and easy to extend.
