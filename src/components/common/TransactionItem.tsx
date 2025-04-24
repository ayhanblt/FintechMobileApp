import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { Typography } from './Typography';

export type TransactionType = 'send' | 'receive' | 'exchange' | 'buy' | 'sell';

export type TransactionItemProps = {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status?: 'completed' | 'pending' | 'failed';
  onPress?: () => void;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  title,
  subtitle,
  amount,
  currency,
  timestamp,
  status = 'completed',
  onPress,
}) => {
  // Icon based on transaction type
  const getIcon = (type: TransactionType): string => {
    switch (type) {
      case 'send':
        return 'arrow-up-right';
      case 'receive':
        return 'arrow-down-left';
      case 'exchange':
        return 'refresh-cw';
      case 'buy':
        return 'shopping-cart';
      case 'sell':
        return 'tag';
      default:
        return 'circle';
    }
  };

  // Color based on transaction type
  const getIconColor = (type: TransactionType): string => {
    switch (type) {
      case 'send':
        return 'error';
      case 'receive':
        return 'success';
      case 'exchange':
        return 'info';
      case 'buy':
        return 'primary.500';
      case 'sell':
        return 'accent.500';
      default:
        return 'text.tertiary';
    }
  };

  // Format amount with proper sign
  const formatAmount = (): string => {
    const sign = type === 'receive' || type === 'buy' ? '+' : type === 'send' || type === 'sell' ? '-' : '';
    return `${sign}${amount.toFixed(2)} ${currency}`;
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Status color
  const statusColor = {
    completed: 'success',
    pending: 'warning',
    failed: 'error',
  }[status];

  return (
    <Pressable onPress={onPress}>
      <Box
        py={3}
        borderBottomWidth={1}
        borderBottomColor="light.200"
      >
        <HStack space={4} alignItems="center" justifyContent="space-between">
          <HStack space={3} alignItems="center">
            <Box
              bg={`${getIconColor(type)}Alpha.100`}
              p={2}
              borderRadius="full"
            >
              <Feather
                name={getIcon(type) as any}
                size={18}
                color={getIconColor(type)}
              />
            </Box>
            <VStack>
              <Typography fontWeight="medium">{title}</Typography>
              <Typography variant="caption">{subtitle}</Typography>
            </VStack>
          </HStack>

          <VStack alignItems="flex-end">
            <Typography
              fontWeight="semibold"
              color={type === 'receive' || type === 'buy' ? 'success' : 'text.primary'}
            >
              {formatAmount()}
            </Typography>
            <HStack space={1} alignItems="center">
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg={statusColor}
                display={status === 'completed' ? 'none' : 'flex'}
              />
              <Typography variant="caption">
                {status !== 'completed' ? status : formatTime(timestamp)}
              </Typography>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
