# Coinpay Fintech Finance Mobile App

This is a React Native implementation of the Coinpay Fintech Finance Mobile App UI Kit, built using Expo and TypeScript.

## Features

- Beautiful UI matching the Figma design
- Authentication flow (Login, Register, Forgot Password)
- Home dashboard with balance and transaction history
- Wallet management screens
- Cryptocurrency market view with price charts
- Profile and settings screens
- Responsive layout for various screen sizes
- Smooth animations and transitions
- TypeScript for type safety
- Cross-platform compatibility (iOS, Android, and Web)

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator, Android Emulator, or physical device for mobile testing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coinpay-app.git
cd coinpay-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Running the App

1. Start the development server:
```bash
npx expo start
```

2. Run on specific platforms:
```bash
# For web
npx expo start --web

# For iOS
npx expo start --ios

# For Android
npx expo start --android
```

3. View in Expo Go:
   - Install the Expo Go app on your iOS or Android device
   - Scan the QR code displayed in the terminal
   - The app will open in Expo Go

## Project Structure

```
coinpay-app/
├── assets/                 # Images, fonts, and other static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Generic UI components (Button, Card, etc.)
│   │   ├── home/           # Home screen specific components
│   │   └── ...             # Other feature-specific components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   ├── screens/            # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── main/           # Main app screens
│   │   └── ...             # Other screen categories
│   ├── theme/              # Theme configuration (colors, typography, etc.)
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── App.tsx                 # Entry point for the application
├── babel.config.js         # Babel configuration
├── tsconfig.json           # TypeScript configuration
└── ...                     # Other configuration files
```

## Components

The application is built using a component-based architecture with the following key components:

### Common UI Components

- `Button`: Customizable button with different variants and states
- `Card`: Container component with various styling options
- `Input`: Form input fields with validation
- `Avatar`: User profile image component
- `Typography`: Text components with predefined styling
- `Icon`: Wrapper for vector icons
- `TabBar`: Navigation tabs for switching between screens

### Feature Components

- `BalanceCard`: Displays user balance with trend indicators
- `CryptoCard`: Cryptocurrency info card with price and change
- `QuickActions`: Grid of action buttons for common tasks
- `RecentTransactions`: List of recent transaction items
- `TransactionItem`: Individual transaction record with details

## Navigation

The app uses React Navigation with the following structure:

- `AppNavigator`: Root navigator that handles authentication state
- `AuthNavigator`: Stack navigator for authentication screens
- `BottomTabNavigator`: Tab navigator for main app screens

## Authentication Flow

The authentication flow includes:

1. Onboarding screens with app introduction
2. Login screen with email/password authentication
3. Registration screen for new user signup
4. Forgot password and OTP verification screens

## Theming

The app uses a consistent theme with:

- Colors: Primary palette, accent colors, and semantic colors
- Typography: Font families, sizes, and weights
- Spacing: Consistent spacing scale
- Components: Themed UI components with consistent styling
