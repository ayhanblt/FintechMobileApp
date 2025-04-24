import React, { useEffect, useState } from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Avatar,
  Pressable,
  useToast,
  Icon,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/BottomTabNavigator';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { BalanceCard } from '../../components/home/BalanceCard';
import { QuickActions } from '../../components/home/QuickActions';
import { RecentTransactions, Transaction } from '../../components/home/RecentTransactions';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { user } = useAuth();
  const toast = useToast();

  // Mock data
  const [balance, setBalance] = useState(8435.25);
  const [balancePercentage, setBalancePercentage] = useState(2.5);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load mock transactions
  useEffect(() => {
    // Simulate API call to fetch transactions
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'receive',
        title: 'From Alex Johnson',
        subtitle: 'Payment received',
        amount: 250.00,
        currency: 'USD',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: '2',
        type: 'send',
        title: 'To Sarah Williams',
        subtitle: 'Monthly rent',
        amount: 1200.00,
        currency: 'USD',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
      {
        id: '3',
        type: 'exchange',
        title: 'USD to BTC',
        subtitle: 'Currency exchange',
        amount: 500.00,
        currency: 'USD',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: '4',
        type: 'buy',
        title: 'Buy Ethereum',
        subtitle: 'Crypto purchase',
        amount: 300.00,
        currency: 'USD',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        status: 'completed',
      },
      {
        id: '5',
        type: 'receive',
        title: 'Refund from Amazon',
        subtitle: 'Order cancellation',
        amount: 75.50,
        currency: 'USD',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      },
    ];

    setTransactions(mockTransactions);
  }, []);

  // Quick action items
  const quickActions = [
    {
      id: '1',
      icon: 'arrow-up-right',
      title: 'Send Money',
      color: 'primary.500',
      onPress: () => navigation.navigate('SendMoney'),
    },
    {
      id: '2',
      icon: 'arrow-down-left',
      title: 'Request Money',
      color: 'accent.500',
      onPress: () => navigation.navigate('RequestMoney'),
    },
    {
      id: '3',
      icon: 'repeat',
      title: 'Exchange',
      color: 'secondary.500',
      onPress: () => toast.show({ 
        title: 'Coming Soon', 
        description: 'Exchange feature will be available soon!',
        status: 'info',
      }),
    },
    {
      id: '4',
      icon: 'shopping-bag',
      title: 'Pay Bills',
      color: 'error',
      onPress: () => toast.show({ 
        title: 'Coming Soon', 
        description: 'Bill payment feature will be available soon!',
        status: 'info',
      }),
    },
    {
      id: '5',
      icon: 'credit-card',
      title: 'Top Up',
      color: 'info',
      onPress: () => toast.show({ 
        title: 'Coming Soon', 
        description: 'Top Up feature will be available soon!',
        status: 'info',
      }),
    },
  ];

  // Handle transaction press
  const handleTransactionPress = (transaction: Transaction) => {
    navigation.navigate('TransactionDetails', { id: transaction.id });
  };

  return (
    <Box flex={1} bg="background.light" safeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={6} px={6} pt={4} pb={6}>
          {/* Header */}
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text color="text.secondary" fontSize="sm">
                Welcome back
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {user?.name || 'User'}
              </Text>
            </VStack>
            
            <HStack space={4} alignItems="center">
              <Pressable
                onPress={() => toast.show({ 
                  title: 'Notifications', 
                  description: 'Coming soon!',
                  status: 'info',
                })}
              >
                <Box position="relative">
                  <Icon as={Feather} name="bell" size={6} color="text.primary" />
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    w={2}
                    h={2}
                    bg="error"
                    borderRadius="full"
                  />
                </Box>
              </Pressable>
              
              <Pressable onPress={() => navigation.navigate('ProfileTab' as any)}>
                <Avatar 
                  size="md" 
                  source={user?.avatarUrl ? { uri: user.avatarUrl } : undefined}
                  bg="primary.500"
                >
                  {user?.name?.[0] || 'U'}
                </Avatar>
              </Pressable>
            </HStack>
          </HStack>

          {/* Balance Card */}
          <BalanceCard
            balance={balance}
            currency="USD"
            percentage={balancePercentage}
            onSend={() => navigation.navigate('SendMoney')}
            onReceive={() => navigation.navigate('RequestMoney')}
            onMore={() => toast.show({ 
              title: 'More Options', 
              description: 'Coming soon!',
              status: 'info',
            })}
          />

          {/* Quick Actions */}
          <QuickActions actions={quickActions} />

          {/* Recent Transactions */}
          <RecentTransactions
            transactions={transactions}
            onViewAll={() => toast.show({ 
              title: 'View All Transactions', 
              description: 'Coming soon!',
              status: 'info',
            })}
            onTransactionPress={handleTransactionPress}
          />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Home;
