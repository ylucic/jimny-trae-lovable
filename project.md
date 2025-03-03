# Jimny Sightings Quest

## Overview
Jimny Sightings Quest is a web application designed for Suzuki Jimny enthusiasts to log and track sightings of Jimny vehicles in their area. Users can record details about the Jimnys they spot on the streets, including the model type, color, and location.

## Features

### 1. Sighting Logging
- **Model Selection**: Choose between 3-door and 5-door Jimny models
- **Color Tracking**: Select from a variety of authentic Jimny colors
- **Location Capture**: Optional geolocation support to record where the Jimny was spotted
- **Real-time Validation**: Immediate feedback on form submission

### 2. Statistics Dashboard
- Total number of sightings
- Most frequently spotted color
- Distribution between 3-door and 5-door models
- Visual statistics presentation with animations

### 3. User Features
- Google Authentication integration
- Personal sighting history tracking
- New color achievement tracking

### 4. UI/UX
- Modern, clean interface with glass-morphism design
- Smooth animations using Framer Motion
- Responsive layout for all devices
- Interactive model selection with visual representations
- Real-time location capture with status indicators

## Technical Stack

### Frontend
- React with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Framer Motion for animations
- shadcn-ui for UI components

### State Management
- React Context for auth state
- Local state management for form handling
- Mock data system for demonstration

### Features Implementation

#### Location Handling
- Uses browser's Geolocation API
- Error handling for various location scenarios
- Optional location attachment to sightings

#### Color System
- Predefined color palette matching official Jimny colors
- Color validation and naming system
- Achievement tracking for discovering new colors

#### Model Selection
- SVG-based model visualization
- Interactive selection interface
- Model-specific statistics tracking

## How It Works

1. **User Authentication**
   - Sign in using Google authentication
   - Persistent user sessions

2. **Logging a Sighting**
   - Select Jimny model (3-door or 5-door)
   - Choose the vehicle color from preset options
   - Optionally capture current location
   - Submit sighting to be added to the database

3. **Statistics Viewing**
   - Real-time updates of sighting statistics
   - Visual representation of data
   - Personal and global statistics tracking

4. **Achievement System**
   - Track new color discoveries
   - Celebration animations for new achievements
   - Personal progress tracking

## Future Enhancements
- Map visualization of sightings
- Photo upload capability
- Social sharing features
- Community statistics and leaderboards
- Advanced filtering and search options