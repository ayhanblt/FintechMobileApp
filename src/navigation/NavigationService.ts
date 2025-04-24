import { createNavigationContainerRef } from '@react-navigation/native';

// Create a navigation reference
export const navigationRef = createNavigationContainerRef();

// Navigate function
export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

// Go back function
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

// Reset navigation state
export function reset(state: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
}
