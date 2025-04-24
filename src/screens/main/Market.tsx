import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Icon,
  FlatList,
  Pressable,
  Spinner,
  Center,
  useToast,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CryptoCard } from '../../components/common/CryptoCard';

// Define cryptocurrency type
type Cryptocurrency = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  iconUrl?: string;
  marketCap?: number;
  volume24h?: number;
};

// Mock cryptocurrency data
const mockCryptocurrencies: Cryptocurrency[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 45678.32,
    change: 2.34,
    iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    marketCap: 876543210000,
    volume24h: 28765432100,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3245.67,
    change: -1.23,
    iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    marketCap: 387654321000,
    volume24h: 15432167800,
  },
  {
    id: 'bnb',
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 423.78,
    change: 0.87,
    iconUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    marketCap: 72345678900,
    volume24h: 5678432100,
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    price: 124.56,
    change: 5.62,
    iconUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    marketCap: 45678321000,
    volume24h: 4321987600,
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    price: 1.23,
    change: -0.45,
    iconUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.svg',
    marketCap: 43215678900,
    volume24h: 2109876500,
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.78,
    change: 1.45,
    iconUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg',
    marketCap: 39876543200,
    volume24h: 1876543200,
  },
  {
    id: 'dot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 18.45,
    change: -2.34,
    iconUrl: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg',
    marketCap: 21098765400,
    volume24h: 987654320,
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.12,
    change: 4.56,
    iconUrl: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg',
    marketCap: 18765432100,
    volume24h: 876543210,
  },
  {
    id: 'avax',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 86.32,
    change: 3.21,
    iconUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
    marketCap: 17654321000,
    volume24h: 765432100,
  },
];

// Filter options
type FilterOption = 'all' | 'gainers' | 'losers' | 'favorites';

// Sort options
type SortOption = 'name' | 'price' | 'change';

const Market = () => {
  const insets = useSafeAreaInsets();
  const toast = useToast();

  // States
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [sort, setSort] = useState<SortOption>('price');
  const [favorites, setFavorites] = useState<string[]>(['btc', 'eth']); // Sample favorite cryptocurrencies

  // Filter options
  const filterOptions: { key: FilterOption; title: string }[] = [
    { key: 'all', title: 'All' },
    { key: 'gainers', title: 'Gainers' },
    { key: 'losers', title: 'Losers' },
    { key: 'favorites', title: 'Favorites' },
  ];

  // Load cryptocurrencies
  useEffect(() => {
    // Simulate API call delay
    const fetchCryptocurrencies = async () => {
      try {
        // In a real app, this would be an API call
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set mock data
        setCryptocurrencies(mockCryptocurrencies);
      } catch (error) {
        console.error('Failed to fetch cryptocurrencies:', error);
        toast.show({
          title: 'Error',
          description: 'Failed to load cryptocurrency data',
          status: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCryptocurrencies();
  }, [toast]);

  // Apply filters and search
  useEffect(() => {
    let result = [...cryptocurrencies];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        crypto =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case 'gainers':
        result = result.filter(crypto => crypto.change > 0);
        break;
      case 'losers':
        result = result.filter(crypto => crypto.change < 0);
        break;
      case 'favorites':
        result = result.filter(crypto => favorites.includes(crypto.id));
        break;
      default:
        break;
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change - a.change;
        default:
          return 0;
      }
    });

    setFilteredCryptos(result);
  }, [cryptocurrencies, searchQuery, activeFilter, sort, favorites]);

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id) 
        : [...prev, id]
    );
    
    toast.show({
      title: favorites.includes(id) ? 'Removed from favorites' : 'Added to favorites',
      status: 'success',
      duration: 2000,
    });
  };

  // Handle cryptocurrency press
  const handleCryptoPress = (crypto: Cryptocurrency) => {
    toast.show({
      title: `${crypto.name} Details`,
      description: 'Detailed view coming soon!',
      status: 'info',
    });
  };

  // Render cryptocurrency item
  const renderCryptoItem = ({ item }: { item: Cryptocurrency }) => (
    <Box px={6} mb={3}>
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
  );

  return (
    <Box flex={1} bg="background.light" pt={insets.top}>
      <VStack flex={1}>
        {/* Header */}
        <Box px={6} py={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading fontSize="xl">Market</Heading>
            <Pressable
              onPress={() => toast.show({
                title: 'Market Insights',
                description: 'Coming soon!',
                status: 'info',
              })}
            >
              <Icon as={Feather} name="bar-chart-2" size="lg" color="text.primary" />
            </Pressable>
          </HStack>
        </Box>

        {/* Search Bar */}
        <Box px={6} mb={4}>
          <Input
            placeholder="Search cryptocurrencies"
            value={searchQuery}
            onChangeText={setSearchQuery}
            bg="white"
            borderRadius="lg"
            py={3}
            px={4}
            fontSize="md"
            InputLeftElement={
              <Icon as={Feather} name="search" size={5} color="text.tertiary" ml={4} />
            }
            InputRightElement={
              searchQuery ? (
                <Pressable onPress={() => setSearchQuery('')} mr={4}>
                  <Icon as={Feather} name="x" size={5} color="text.tertiary" />
                </Pressable>
              ) : null
            }
          />
        </Box>

        {/* Filter Tabs */}
        <Box px={6} mb={4}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={4}>
              {filterOptions.map((option) => (
                <Pressable
                  key={option.key}
                  onPress={() => setActiveFilter(option.key)}
                >
                  <Box 
                    px={4} 
                    py={2} 
                    borderRadius="full"
                    bg={activeFilter === option.key ? 'primary.500' : 'transparent'}
                  >
                    <Text 
                      color={activeFilter === option.key ? 'white' : 'text.secondary'}
                      fontWeight={activeFilter === option.key ? 'semibold' : 'normal'}
                    >
                      {option.title}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>
        </Box>

        {/* Sort Options */}
        <Box px={6} mb={2}>
          <HStack justifyContent="flex-end" space={2}>
            <Text color="text.secondary" fontSize="sm">Sort by:</Text>
            <Pressable onPress={() => setSort('price')}>
              <Text 
                fontSize="sm" 
                color={sort === 'price' ? 'primary.500' : 'text.secondary'}
                fontWeight={sort === 'price' ? 'semibold' : 'normal'}
              >
                Price
              </Text>
            </Pressable>
            <Text color="text.secondary" fontSize="sm">|</Text>
            <Pressable onPress={() => setSort('change')}>
              <Text 
                fontSize="sm" 
                color={sort === 'change' ? 'primary.500' : 'text.secondary'}
                fontWeight={sort === 'change' ? 'semibold' : 'normal'}
              >
                Change
              </Text>
            </Pressable>
            <Text color="text.secondary" fontSize="sm">|</Text>
            <Pressable onPress={() => setSort('name')}>
              <Text 
                fontSize="sm" 
                color={sort === 'name' ? 'primary.500' : 'text.secondary'}
                fontWeight={sort === 'name' ? 'semibold' : 'normal'}
              >
                Name
              </Text>
            </Pressable>
          </HStack>
        </Box>

        {/* Cryptocurrency List */}
        {loading ? (
          <Center flex={1}>
            <Spinner size="lg" color="primary.500" />
            <Text mt={4} color="text.secondary">Loading cryptocurrencies...</Text>
          </Center>
        ) : filteredCryptos.length === 0 ? (
          <Center flex={1} px={6}>
            <Icon as={Feather} name="search" size="4xl" color="light.400" />
            <Text mt={4} fontSize="lg" fontWeight="medium" textAlign="center">
              No cryptocurrencies found
            </Text>
            <Text color="text.secondary" textAlign="center" mt={2}>
              Try adjusting your search or filters
            </Text>
            <Button 
              mt={6} 
              leftIcon={<Icon as={Feather} name="refresh-cw" size="sm" />}
              onPress={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </Center>
        ) : (
          <FlatList
            data={filteredCryptos}
            keyExtractor={item => item.id}
            renderItem={renderCryptoItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </VStack>
    </Box>
  );
};

// Helper component for horizontal scrolling
const ScrollView = (props: any) => {
  return (
    <Box>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        {...props}
      />
    </Box>
  );
};

// Helper component for button
const Button = (props: any) => {
  return (
    <Pressable
      bg="primary.500"
      px={4}
      py={2}
      borderRadius="lg"
      _pressed={{ bg: 'primary.600' }}
      flexDirection="row"
      alignItems="center"
      {...props}
    >
      {props.leftIcon && <Box mr={2}>{props.leftIcon}</Box>}
      <Text color="white" fontWeight="medium">{props.children}</Text>
    </Pressable>
  );
};

export default Market;
