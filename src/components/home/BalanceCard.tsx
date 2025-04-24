import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../common/Typography';
import { Button } from '../common/Button';

export type BalanceCardProps = {
  balance: number;
  currency: string;
  percentage: number;
  onSend?: () => void;
  onReceive?: () => void;
  onMore?: () => void;
};

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  currency = 'USD',
  percentage,
  onSend,
  onReceive,
  onMore,
}) => {
  // Format balance with proper currency
  const formatBalance = (balance: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  };

  // Format percentage
  const formatPercentage = (percentage: number): string => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  return (
    <Box borderRadius="lg" overflow="hidden" mb={6}>
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Box p={5}>
          <HStack justifyContent="space-between" alignItems="center" mb={5}>
            <Typography variant="subtitle" color="white">
              Total Balance
            </Typography>
            <Pressable onPress={onMore}>
              <Feather name="more-horizontal" size={24} color="white" />
            </Pressable>
          </HStack>

          <Text color="white" fontSize="3xl" fontWeight="bold" mb={1}>
            {formatBalance(balance, currency)}
          </Text>

          <HStack space={1} alignItems="center" mb={6}>
            <Feather
              name={percentage >= 0 ? 'trending-up' : 'trending-down'}
              size={16}
              color={percentage >= 0 ? '#4CAF50' : '#FF3D00'}
            />
            <Typography 
              variant="caption" 
              color={percentage >= 0 ? '#4CAF50' : '#FF3D00'}
              bg="rgba(255, 255, 255, 0.2)"
              px={1.5}
              py={0.5}
              borderRadius="md"
            >
              {formatPercentage(percentage)}
            </Typography>
          </HStack>

          <HStack space={4}>
            <Button
              leftIcon="arrow-up-right"
              flex={1}
              bg="rgba(255, 255, 255, 0.2)"
              _text={{ color: 'white' }}
              _hover={{ bg: 'rgba(255, 255, 255, 0.3)' }}
              _pressed={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              onPress={onSend}
            >
              Send
            </Button>
            <Button
              leftIcon="arrow-down-left"
              flex={1}
              bg="white"
              _text={{ color: 'primary.500' }}
              onPress={onReceive}
            >
              Receive
            </Button>
          </HStack>
        </Box>
      </LinearGradient>
    </Box>
  );
};
