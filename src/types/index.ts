/**
 * Global type definitions for the app
 */

import { TransactionType } from '../components/common/TransactionItem';

/**
 * User type definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  country?: string;
  dateJoined?: Date;
}

/**
 * Wallet type definition
 */
export interface Wallet {
  id: string;
  currency: string;
  symbol: string;
  balance: number;
  address?: string;
  type: 'fiat' | 'crypto';
  isDefault?: boolean;
}

/**
 * Transaction type definition
 */
export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
  senderName?: string;
  senderAvatar?: string;
  receiverName?: string;
  receiverAvatar?: string;
  transactionId: string;
  reference?: string;
  exchangeRate?: number;
  receivedAmount?: number;
  receivedCurrency?: string;
  orderId?: string;
}

/**
 * Cryptocurrency type definition
 */
export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  marketCap?: number;
  volume24h?: number;
  iconUrl?: string;
}

/**
 * Contact type definition
 */
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isFavorite?: boolean;
}

/**
 * Notification type definition
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'transaction' | 'system' | 'promotion';
  data?: Record<string, any>;
}

/**
 * Payment Method type definition
 */
export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal' | 'other';
  name: string;
  isDefault: boolean;
  // Card-specific properties
  cardNumber?: string;
  cardType?: 'visa' | 'mastercard' | 'amex' | 'discover';
  expiryDate?: string;
  // Bank-specific properties
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  // PayPal-specific properties
  email?: string;
}

/**
 * Error response type definition
 */
export interface ErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Form field type definition
 */
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: any }>;
  validation?: (value: any) => string;
}

/**
 * Theme mode type definition
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Currency code type definition
 */
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'BTC' | 'ETH';

/**
 * Navigation param lists
 */
export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyOTP: { email: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  WalletTab: undefined;
  MarketTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  SendMoney: undefined;
  RequestMoney: undefined;
  TransactionDetails: { id: string };
};
