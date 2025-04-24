import React, { useState, useEffect } from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Heading,
  Text,
  Pressable,
  Icon,
  useToast,
  FlatList,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CryptoCard } from '../../components/common/CryptoCard';
import { TabBar } from '../../components/common/TabBar';

// Mock cryptocurrency data
const cryptoCurrencies = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 45678.32,
    change: 2.34,
    iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3245.67,
    change: -1.23,
    iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
  },
  {
    id: 'bnb',
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 423.78,
    change: 0.87,
    iconUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    price: 124.56,
    change: 5.62,
    iconUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    price: 1.23,
    change: -0.45,
    iconUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.svg',
  },
];

// Mock wallet data
const walletCards = [
  {
    id: 'usd',
    name: 'US Dollar',
    symbol: 'USD',
    balance: 4580.25,
    change: 0,
    iconUrl: null,
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 0.0754,
    change: 2.34,
    iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    balance: 1.25,
    change: -1.23,
    iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
  },
];

const Wallet = () => {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  
  // State
  const [activeTab, setActiveTab] = useState('wallet');
  const [activeSubTab, setActiveSubTab] = useState('all');

  // Wallet tabs
  const tabs = [
    { key: 'wallet', title: 'Wallet', icon: 'credit-card' },
    { key: 'market', title: 'Market', icon: 'bar-chart-2' },
  ];

  // Subtabs for market view
  const marketSubTabs = [
    { key: 'all', title: 'All' },
    { key: 'gainers', title: 'Gainers' },
    { key: 'losers', title: 'Losers' },
    { key: 'favorites', title: 'Favorites' },
  ];

  // Handle crypto card press
  const handleCryptoPress = (crypto: any) => {
    toast.show({
      title: `${crypto.name} Details`,
      description: 'Detailed view coming soon!',
      status: 'info',
    });
  };

  // Filter cryptocurrencies based on selected subtab
  const getFilteredCryptos = () => {
    switch (activeSubTab) {
      case 'gainers':
        return cryptoCurrencies.filter(crypto => crypto.change > 0);
      case 'losers':
        return cryptoCurrencies.filter(crypto => crypto.change < 0);
      case 'favorites':
        // In a real app, this would come from user preferences
        return cryptoCurrencies.filter(crypto => ['btc', 'eth'].includes(crypto.id));
      default:
        return cryptoCurrencies;
    }
  };

  return (
    <Box flex={1} bg="background.light" pt={insets.top}>
      <VStack flex={1}>
        {/* Header */}
        <Box px={6} py={4}>
          <Heading fontSize="xl">My Wallet</Heading>
        </Box>

        {/* Tab Bar */}
        <Box px={6}>
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="filled"
          />
        </Box>

        {/* Content */}
        {activeTab === 'wallet' ? (
          <ScrollView 
            flex={1} 
            px={6} 
            py={4}
            showsVerticalScrollIndicator={false}
          >
            <VStack space={6}>
              {/* Wallet Balance Summary */}
              <VStack>
                <Text color="text.secondary" fontSize="sm">
                  Total Balance
                </Text>
                <Text fontSize="3xl" fontWeight="bold">
                  $8,435.25
                </Text>
                <HStack space={1} alignItems="center">
                  <Icon 
                    as={Feather} 
                    name="trending-up" 
                    size="sm" 
                    color="success" 
                  />
                  <Text color="success" fontSize="sm">
                    +2.5% ($210.25)
                  </Text>
                </HStack>
              </VStack>

              {/* Wallet Cards */}
              <VStack space={4}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Heading fontSize="md">My Assets</Heading>
                  <Pressable onPress={() => toast.show({ 
                    title: 'Manage Assets', 
                    description: 'Coming soon!',
                    status: 'info',
                  })}>
                    <Text color="primary.500" fontWeight="medium">
                      See All
                    </Text>
                  </Pressable>
                </HStack>

                {walletCards.map((wallet) => (
                  <Pressable 
                    key={wallet.id}
                    onPress={() => handleCryptoPress(wallet)}
                  >
                    <Box
                      bg="white"
                      borderRadius="lg"
                      p={4}
                      shadow={1}
                    >
                      <HStack justifyContent="space-between" alignItems="center">
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
                            {wallet.iconUrl ? (
                              <Text fontSize="lg" fontWeight="bold">
                                {wallet.symbol.charAt(0)}
                              </Text>
                            ) : (
                              <Icon 
                                as={Feather} 
                                name="dollar-sign" 
                                size="lg" 
                                color="text.primary" 
                              />
                            )}
                          </Box>
                          <VStack>
                            <Text fontWeight="semibold">{wallet.name}</Text>
                            <Text color="text.tertiary">{wallet.symbol}</Text>
                          </VStack>
                        </HStack>

                        <VStack alignItems="flex-end">
                          <Text fontWeight="semibold">
                            {wallet.id === 'usd' 
                              ? `$${wallet.balance.toFixed(2)}` 
                              : `${wallet.balance} ${wallet.symbol}`}
                          </Text>
                          <Text fontSize="xs" color="text.tertiary">
                            {wallet.id !== 'usd' 
                              ? `$${(wallet.balance * cryptoCurrencies.find(c => c.id === wallet.id)?.price || 0).toFixed(2)}` 
                              : ''}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </Pressable>
                ))}
              </VStack>

              {/* Quick Actions */}
              <HStack space={4} justifyContent="center">
                <Pressable 
                  flex={1}
                  onPress={() => toast.show({ 
                    title: 'Deposit', 
                    description: 'Coming soon!',
                    status: 'info',
                  })}
                >
                  <VStack 
                    alignItems="center" 
                    bg="white" 
                    p={4} 
                    borderRadius="lg"
                    shadow={1}
                  >
                    <Icon 
                      as={Feather} 
                      name="arrow-down" 
                      size="lg" 
                      color="primary.500" 
                    />
                    <Text mt={2}>Deposit</Text>
                  </VStack>
                </Pressable>
                
                <Pressable 
                  flex={1}
                  onPress={() => toast.show({ 
                    title: 'Withdraw', 
                    description: 'Coming soon!',
                    status: 'info',
                  })}
                >
                  <VStack 
                    alignItems="center" 
                    bg="white" 
                    p={4} 
                    borderRadius="lg"
                    shadow={1}
                  >
                    <Icon 
                      as={Feather} 
                      name="arrow-up" 
                      size="lg" 
                      color="error" 
                    />
                    <Text mt={2}>Withdraw</Text>
                  </VStack>
                </Pressable>
                
                <Pressable 
                  flex={1}
                  onPress={() => toast.show({ 
                    title: 'Exchange', 
                    description: 'Coming soon!',
                    status: 'info',
                  })}
                >
                  <VStack 
                    alignItems="center" 
                    bg="white" 
                    p={4} 
                    borderRadius="lg"
                    shadow={1}
                  >
                    <Icon 
                      as={Feather} 
                      name="repeat" 
                      size="lg" 
                      color="secondary.500" 
                    />
                    <Text mt={2}>Exchange</Text>
                  </VStack>
                </Pressable>
              </HStack>
            </VStack>
          </ScrollView>
        ) : (
          <VStack flex={1}>
            {/* Market Subtabs */}
            <Box px={6} py={2}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
              >
                <HStack space={4}>
                  {marketSubTabs.map((tab) => (
                    <Pressable
                      key={tab.key}
                      onPress={() => setActiveSubTab(tab.key)}
                    >
                      <Box 
                        px={4} 
                        py={2} 
                        borderRadius="full"
                        bg={activeSubTab === tab.key ? 'primary.500' : 'transparent'}
                      >
                        <Text 
                          color={activeSubTab === tab.key ? 'white' : 'text.secondary'}
                          fontWeight={activeSubTab === tab.key ? 'semibold' : 'normal'}
                        >
                          {tab.title}
                        </Text>
                      </Box>
                    </Pressable>
                  ))}
                </HStack>
              </ScrollView>
            </Box>

            {/* Market List */}
            <FlatList
              data={getFilteredCryptos()}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Box px={6}>
                  <CryptoCard
                    id={item.id}
                    name={item.name}
                    symbol={item.symbol}
                    price={item.price}
                    change={item.change}
                    iconUrl={item.iconUrl}
                    onPress={() => handleCryptoPress(item)}
                  />
                </Box>
              )}
              contentContainerStyle={{ paddingVertical: 16 }}
              showsVerticalScrollIndicator={false}
            />
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default Wallet;
