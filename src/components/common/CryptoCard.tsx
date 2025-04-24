import React from 'react';
import { Box, HStack, VStack, Image, Text, Pressable } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { Typography } from './Typography';

export type CryptoCardProps = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  iconUrl?: string;
  onPress?: () => void;
};

export const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  price,
  change,
  iconUrl,
  onPress,
}) => {
  // Format price with proper currency symbol
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Format change percentage
  const formatChange = (change: number): string => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  // Determine change color based on positive/negative
  const changeColor = change >= 0 ? 'success' : 'error';
  const changeIcon = change >= 0 ? 'trending-up' : 'trending-down';

  return (
    <Pressable onPress={onPress}>
      <Box
        bg="white"
        borderRadius="lg"
        p={4}
        shadow={1}
        mb={3}
      >
        <HStack space={4} alignItems="center" justifyContent="space-between">
          <HStack space={3} alignItems="center">
            <Box 
              bg="light.100" 
              p={2} 
              borderRadius="full"
              w={12}
              h={12}
              alignItems="center"
              justifyContent="center"
            >
              {iconUrl ? (
                <Image 
                  source={{ uri: iconUrl }} 
                  alt={name}
                  size="sm"
                  fallbackElement={
                    <Text fontSize="lg" fontWeight="bold">
                      {symbol.charAt(0)}
                    </Text>
                  }
                />
              ) : (
                <Text fontSize="lg" fontWeight="bold">
                  {symbol.charAt(0)}
                </Text>
              )}
            </Box>
            <VStack>
              <Typography fontWeight="semibold">{name}</Typography>
              <Typography variant="subtitle" color="text.tertiary">
                {symbol}
              </Typography>
            </VStack>
          </HStack>

          <VStack alignItems="flex-end">
            <Typography fontWeight="semibold">
              {formatPrice(price)}
            </Typography>
            <HStack space={1} alignItems="center">
              <Feather name={changeIcon} size={14} color={changeColor} />
              <Typography variant="caption" color={changeColor}>
                {formatChange(change)}
              </Typography>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
