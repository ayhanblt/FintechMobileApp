import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Icon,
  Pressable,
  Avatar,
  ScrollView,
  useToast,
  KeyboardAvoidingView,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Platform, Keyboard } from 'react-native';
import { Button } from '../../components/common/Button';
import { useForm } from '../../hooks/useForm';
import { formatCurrency } from '../../utils/helpers';

// Sample recent contacts
const recentContacts = [
  {
    id: '1',
    name: 'Sarah Williams',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    email: 'sarah.williams@example.com',
  },
  {
    id: '2',
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'michael.brown@example.com',
  },
  {
    id: '3',
    name: 'Jessica Taylor',
    avatar: 'https://randomuser.me/api/portraits/women/91.jpg',
    email: 'jessica.taylor@example.com',
  },
  {
    id: '4',
    name: 'David Miller',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    email: 'david.miller@example.com',
  },
  {
    id: '5',
    name: 'Emily Davis',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    email: 'emily.davis@example.com',
  },
];

const SendMoneyScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Select recipient, 2: Enter amount, 3: Review
  
  // Form state using custom hook
  const { values, errors, handleChange, handleSubmit, validateForm } = useForm(
    {
      recipient: '',
      amount: '',
      note: '',
    },
    {
      recipient: (value) => (!value ? 'Recipient is required' : ''),
      amount: (value) => {
        if (!value) return 'Amount is required';
        if (isNaN(Number(value)) || Number(value) <= 0) return 'Please enter a valid amount';
        if (Number(value) > 10000) return 'Maximum transfer amount is $10,000';
        return '';
      },
    },
    handleSendMoney
  );

  // Filter contacts based on search query
  const filteredContacts = recentContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle contact selection
  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
    handleChange('recipient', contact.email);
    setCurrentStep(2);
  };

  // Handle going back to previous step
  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  // Handle continuing to next step
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedContact) {
        toast.show({
          title: 'Please select a recipient',
          status: 'warning',
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateForm(['amount'])) {
        return;
      }
      setCurrentStep(3);
    }
  };

  // Handle sending money
  function handleSendMoney() {
    // Simulate sending money process
    toast.show({
      title: 'Money Sent!',
      description: `$${values.amount} has been sent to ${selectedContact?.name}`,
      status: 'success',
      duration: 3000,
    });
    
    // Go back to home after a delay
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  }

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Box flex={1} bg="background.light" safeAreaBottom>
        <ScrollView 
          flex={1} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <VStack flex={1} px={6} py={4} space={6}>
            {/* Step 1: Select Recipient */}
            {currentStep === 1 && (
              <VStack space={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Select Recipient
                </Text>
                
                {/* Search Input */}
                <Input
                  placeholder="Search by name or email"
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
                
                {/* Recent Contacts */}
                <Text fontSize="md" fontWeight="semibold" mt={2} mb={1}>
                  Recent Contacts
                </Text>
                
                {filteredContacts.length === 0 ? (
                  <Box py={10} alignItems="center">
                    <Icon as={Feather} name="users" size="4xl" color="light.400" />
                    <Text mt={4} color="text.secondary">
                      No contacts found
                    </Text>
                  </Box>
                ) : (
                  <VStack space={2} mt={2}>
                    {filteredContacts.map((contact) => (
                      <Pressable
                        key={contact.id}
                        onPress={() => handleContactSelect(contact)}
                        bg="white"
                        p={4}
                        borderRadius="lg"
                        shadow={1}
                      >
                        <HStack space={3} alignItems="center">
                          <Avatar
                            size="md"
                            source={{ uri: contact.avatar }}
                            name={contact.name}
                          />
                          <VStack>
                            <Text fontWeight="semibold">{contact.name}</Text>
                            <Text color="text.secondary" fontSize="sm">
                              {contact.email}
                            </Text>
                          </VStack>
                        </HStack>
                      </Pressable>
                    ))}
                  </VStack>
                )}
              </VStack>
            )}

            {/* Step 2: Enter Amount */}
            {currentStep === 2 && (
              <VStack space={6}>
                <VStack space={2} alignItems="center">
                  <Text fontSize="lg" fontWeight="bold">
                    Enter Amount
                  </Text>
                  <HStack space={2} alignItems="center">
                    <Avatar
                      size="sm"
                      source={{ uri: selectedContact?.avatar }}
                      name={selectedContact?.name}
                    />
                    <Text color="text.secondary">
                      Sending to {selectedContact?.name}
                    </Text>
                  </HStack>
                </VStack>
                
                {/* Amount Input */}
                <VStack space={4} alignItems="center" my={6}>
                  <HStack alignItems="center">
                    <Text fontSize="3xl" fontWeight="bold" mr={2}>
                      $
                    </Text>
                    <Input
                      variant="unstyled"
                      placeholder="0.00"
                      fontSize="4xl"
                      fontWeight="bold"
                      keyboardType="decimal-pad"
                      textAlign="center"
                      value={values.amount}
                      onChangeText={(text) => handleChange('amount', text)}
                      width="auto"
                      maxWidth="200px"
                    />
                  </HStack>
                  {errors.amount ? (
                    <Text color="error" fontSize="sm">
                      {errors.amount}
                    </Text>
                  ) : (
                    <Text color="text.secondary">
                      Available balance: $8,435.25
                    </Text>
                  )}
                </VStack>
                
                {/* Note Input */}
                <VStack space={2}>
                  <Text fontSize="md" fontWeight="semibold">
                    Add a Note (Optional)
                  </Text>
                  <Input
                    placeholder="What's this for?"
                    value={values.note}
                    onChangeText={(text) => handleChange('note', text)}
                    bg="white"
                    borderRadius="lg"
                    py={3}
                    px={4}
                    fontSize="md"
                    InputLeftElement={
                      <Icon as={Feather} name="message-square" size={5} color="text.tertiary" ml={4} />
                    }
                  />
                </VStack>
              </VStack>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <VStack space={4}>
                <VStack space={2} alignItems="center">
                  <Text fontSize="lg" fontWeight="bold">
                    Review Transfer
                  </Text>
                  <Text color="text.secondary">
                    Please confirm the transaction details
                  </Text>
                </VStack>
                
                {/* Transaction Summary */}
                <Box bg="white" p={6} borderRadius="lg" shadow={1} mt={4}>
                  <VStack space={4}>
                    <HStack justifyContent="space-between">
                      <Text color="text.secondary">Recipient</Text>
                      <HStack space={2} alignItems="center">
                        <Avatar
                          size="xs"
                          source={{ uri: selectedContact?.avatar }}
                          name={selectedContact?.name}
                        />
                        <Text fontWeight="semibold">{selectedContact?.name}</Text>
                      </HStack>
                    </HStack>
                    
                    <HStack justifyContent="space-between">
                      <Text color="text.secondary">Amount</Text>
                      <Text fontWeight="semibold">{formatCurrency(Number(values.amount))}</Text>
                    </HStack>
                    
                    <HStack justifyContent="space-between">
                      <Text color="text.secondary">Fee</Text>
                      <Text fontWeight="semibold">$0.00</Text>
                    </HStack>
                    
                    {values.note && (
                      <HStack justifyContent="space-between">
                        <Text color="text.secondary">Note</Text>
                        <Text fontWeight="semibold">{values.note}</Text>
                      </HStack>
                    )}
                    
                    <Divider my={2} />
                    
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold">Total</Text>
                      <Text fontWeight="bold" fontSize="lg">
                        {formatCurrency(Number(values.amount))}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            )}
          </VStack>
        </ScrollView>

        {/* Bottom Action Buttons */}
        <Box px={6} py={4} bg="white" shadow={5}>
          <HStack space={4}>
            <Button
              variant="outline"
              flex={1}
              onPress={handleBackStep}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            
            {currentStep < 3 ? (
              <Button
                flex={1}
                onPress={handleNextStep}
              >
                {currentStep === 1 ? 'Next' : 'Review'}
              </Button>
            ) : (
              <Button
                flex={1}
                onPress={() => handleSubmit()}
              >
                Send Money
              </Button>
            )}
          </HStack>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

// Helper component for divider
const Divider = (props: any) => {
  return (
    <Box h="1px" w="100%" bg="light.200" {...props} />
  );
};

export default SendMoneyScreen;
