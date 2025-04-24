import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Avatar,
  Pressable,
  useToast,
  ScrollView,
  Button,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/BottomTabNavigator';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { TransactionType } from '../../components/common/TransactionItem';

type TransactionDetailsRouteProp = RouteProp<HomeStackParamList, 'TransactionDetails'>;

// Sample transaction details (in a real app, this would be fetched from API)
const SAMPLE_TRANSACTIONS = [
  {
    id: '1',
    type: 'receive' as TransactionType,
    title: 'From Alex Johnson',
    subtitle: 'Payment received',
    amount: 250.00,
    currency: 'USD',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'completed',
    description: 'Payment for freelance work',
    senderName: 'Alex Johnson',
    senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    transactionId: 'TX-123456789',
    reference: 'REF-123456',
  },
  {
    id: '2',
    type: 'send' as TransactionType,
    title: 'To Sarah Williams',
    subtitle: 'Monthly rent',
    amount: 1200.00,
    currency: 'USD',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    status: 'completed',
    description: 'Monthly rent payment',
    receiverName: 'Sarah Williams',
    receiverAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    transactionId: 'TX-987654321',
    reference: 'REF-789012',
  },
  {
    id: '3',
    type: 'exchange' as TransactionType,
    title: 'USD to BTC',
    subtitle: 'Currency exchange',
    amount: 500.00,
    currency: 'USD',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'completed',
    description: 'Exchanged USD to Bitcoin',
    exchangeRate: 0.000021,
    receivedAmount: 0.0105,
    receivedCurrency: 'BTC',
    transactionId: 'TX-456789012',
    reference: 'REF-345678',
  },
  {
    id: '4',
    type: 'buy' as TransactionType,
    title: 'Buy Ethereum',
    subtitle: 'Crypto purchase',
    amount: 300.00,
    currency: 'USD',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    status: 'completed',
    description: 'Purchased Ethereum',
    exchangeRate: 0.00031,
    receivedAmount: 0.093,
    receivedCurrency: 'ETH',
    transactionId: 'TX-345678901',
    reference: 'REF-456789',
  },
  {
    id: '5',
    type: 'receive' as TransactionType,
    title: 'Refund from Amazon',
    subtitle: 'Order cancellation',
    amount: 75.50,
    currency: 'USD',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    status: 'completed',
    description: 'Refund for canceled order',
    senderName: 'Amazon',
    senderAvatar: '',
    transactionId: 'TX-234567890',
    reference: 'REF-567890',
    orderId: 'ORDER-12345',
  },
];

const TransactionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<TransactionDetailsRouteProp>();
  const toast = useToast();
  
  const { id } = route.params;
  
  // State
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch transaction details
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundTransaction = SAMPLE_TRANSACTIONS.find(t => t.id === id);
      setTransaction(foundTransaction);
      setLoading(false);
    }, 500);
  }, [id]);

  // Handle download receipt
  const handleDownloadReceipt = () => {
    toast.show({
      title: 'Receipt Downloaded',
      description: 'Transaction receipt has been saved to your device',
      status: 'success',
    });
  };

  // Handle share transaction
  const handleShareTransaction = () => {
    toast.show({
      title: 'Share Transaction',
      description: 'Transaction details shared successfully',
      status: 'success',
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'text.secondary';
    }
  };

  // Get icon based on transaction type
  const getTransactionIcon = (type: TransactionType): string => {
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

  // Get color based on transaction type
  const getTransactionColor = (type: TransactionType): string => {
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

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="background.light">
        <Spinner size="lg" color="primary.500" />
        <Text mt={4} color="text.secondary">Loading transaction details...</Text>
      </Box>
    );
  }

  if (!transaction) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="background.light" p={6}>
        <Icon as={Feather} name="alert-circle" size="4xl" color="light.400" />
        <Text mt={4} fontSize="lg" fontWeight="bold" textAlign="center">
          Transaction Not Found
        </Text>
        <Text mt={2} color="text.secondary" textAlign="center">
          We couldn't find the transaction you're looking for.
        </Text>
        <Button mt={6} onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="background.light" safeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={6} p={6}>
          {/* Transaction Amount */}
          <VStack space={2} alignItems="center">
            <Box
              bg={`${getTransactionColor(transaction.type)}Alpha.100`}
              p={3}
              borderRadius="full"
              mb={2}
            >
              <Icon
                as={Feather}
                name={getTransactionIcon(transaction.type)}
                size="lg"
                color={getTransactionColor(transaction.type)}
              />
            </Box>
            <Text fontSize="3xl" fontWeight="bold">
              {transaction.type === 'receive' || transaction.type === 'buy'
                ? '+'
                : transaction.type === 'send' || transaction.type === 'sell'
                ? '-'
                : ''}
              {formatCurrency(transaction.amount, transaction.currency)}
            </Text>
            <HStack space={2} alignItems="center">
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg={getStatusColor(transaction.status)}
              />
              <Text color="text.secondary">
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Text>
            </HStack>
            <Text color="text.tertiary" fontSize="sm">
              {formatDate(transaction.timestamp, true)}
            </Text>
          </VStack>

          {/* Transaction Details */}
          <Box bg="white" p={5} borderRadius="lg" shadow={1}>
            <VStack space={4}>
              <Text fontSize="lg" fontWeight="semibold">Transaction Details</Text>
              
              <Divider />
              
              <HStack justifyContent="space-between">
                <Text color="text.secondary">Type</Text>
                <Text fontWeight="medium">
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </Text>
              </HStack>
              
              {transaction.type === 'send' && (
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="text.secondary">Recipient</Text>
                  <HStack space={2} alignItems="center">
                    <Avatar
                      size="xs"
                      source={{ uri: transaction.receiverAvatar }}
                      name={transaction.receiverName}
                    />
                    <Text fontWeight="medium">{transaction.receiverName}</Text>
                  </HStack>
                </HStack>
              )}
              
              {transaction.type === 'receive' && (
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="text.secondary">Sender</Text>
                  <HStack space={2} alignItems="center">
                    <Avatar
                      size="xs"
                      source={{ uri: transaction.senderAvatar }}
                      name={transaction.senderName}
                    />
                    <Text fontWeight="medium">{transaction.senderName}</Text>
                  </HStack>
                </HStack>
              )}
              
              {(transaction.type === 'exchange' || transaction.type === 'buy') && (
                <HStack justifyContent="space-between">
                  <Text color="text.secondary">Exchange Rate</Text>
                  <Text fontWeight="medium">
                    1 {transaction.currency} = {transaction.exchangeRate} {transaction.receivedCurrency}
                  </Text>
                </HStack>
              )}
              
              {(transaction.type === 'exchange' || transaction.type === 'buy') && (
                <HStack justifyContent="space-between">
                  <Text color="text.secondary">Received</Text>
                  <Text fontWeight="medium">
                    {transaction.receivedAmount} {transaction.receivedCurrency}
                  </Text>
                </HStack>
              )}
              
              <HStack justifyContent="space-between">
                <Text color="text.secondary">Date & Time</Text>
                <Text fontWeight="medium">{formatDate(transaction.timestamp, true)}</Text>
              </HStack>
              
              <HStack justifyContent="space-between">
                <Text color="text.secondary">Transaction ID</Text>
                <Text fontWeight="medium">{transaction.transactionId}</Text>
              </HStack>
              
              {transaction.reference && (
                <HStack justifyContent="space-between">
                  <Text color="text.secondary">Reference</Text>
                  <Text fontWeight="medium">{transaction.reference}</Text>
                </HStack>
              )}
              
              {transaction.orderId && (
                <HStack justifyContent="space-between">
                  <Text color="text.secondary">Order ID</Text>
                  <Text fontWeight="medium">{transaction.orderId}</Text>
                </HStack>
              )}
              
              {transaction.description && (
                <VStack space={1}>
                  <Text color="text.secondary">Description</Text>
                  <Text fontWeight="medium">{transaction.description}</Text>
                </VStack>
              )}
            </VStack>
          </Box>

          {/* Actions */}
          <HStack space={4} mt={2}>
            <Pressable
              flex={1}
              bg="white"
              p={4}
              borderRadius="lg"
              shadow={1}
              onPress={handleDownloadReceipt}
              alignItems="center"
            >
              <Icon as={Feather} name="download" size="lg" color="primary.500" />
              <Text mt={2} fontSize="sm">
                Download Receipt
              </Text>
            </Pressable>
            
            <Pressable
              flex={1}
              bg="white"
              p={4}
              borderRadius="lg"
              shadow={1}
              onPress={handleShareTransaction}
              alignItems="center"
            >
              <Icon as={Feather} name="share-2" size="lg" color="primary.500" />
              <Text mt={2} fontSize="sm">
                Share
              </Text>
            </Pressable>
            
            <Pressable
              flex={1}
              bg="white"
              p={4}
              borderRadius="lg"
              shadow={1}
              onPress={() => toast.show({ 
                title: 'Support', 
                description: 'Contact support feature is coming soon',
                status: 'info',
              })}
              alignItems="center"
            >
              <Icon as={Feather} name="help-circle" size="lg" color="primary.500" />
              <Text mt={2} fontSize="sm">
                Support
              </Text>
            </Pressable>
          </HStack>

          {/* If it's a payment, show repeat payment option */}
          {(transaction.type === 'send' || transaction.type === 'receive') && (
            <Button
              leftIcon={<Icon as={Feather} name="repeat" size="sm" />}
              mt={2}
              onPress={() => {
                if (transaction.type === 'send') {
                  navigation.navigate('SendMoney');
                } else {
                  navigation.navigate('RequestMoney');
                }
              }}
            >
              {transaction.type === 'send' ? 'Send Again' : 'Request Again'}
            </Button>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

// Helper components
const Divider = (props: any) => (
  <Box h="1px" w="100%" bg="light.200" {...props} />
);

const Spinner = (props: any) => (
  <HStack space={2} justifyContent="center" alignItems="center" {...props}>
    <Box
      width={8}
      height={8}
      rounded="full"
      borderWidth={2}
      borderColor={props.color || "primary.500"}
      borderTopColor="transparent"
      borderRightColor="transparent"
      style={{
        transform: [{ rotate: '45deg' }],
      }}
    />
  </HStack>
);

export default TransactionDetailsScreen;
