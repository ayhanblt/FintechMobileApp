import React, { useState, useRef } from 'react';
import {
  Box,
  Center,
  VStack,
  Image,
  Text,
  Button,
  HStack,
  Pressable,
  useColorModeValue,
} from 'native-base';
import { Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

type OnboardingNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

// Onboarding data
const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Coinpay',
    description: 'The easiest way to manage and exchange your cryptocurrencies securely.',
    image: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/crypto-wallet-2-837697.png',
  },
  {
    id: '2',
    title: 'Trade with Confidence',
    description: 'Buy, sell, and exchange cryptocurrencies with just a few taps.',
    image: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/cryptocurrency-exchange-3545506-2969855.png',
  },
  {
    id: '3',
    title: 'Track Your Portfolio',
    description: 'Monitor your assets and track their performance in real-time.',
    image: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/crypto-analytics-2837686.png',
  },
];

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // Animation values
  const scrollX = useSharedValue(0);

  // Handle scroll event
  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = offsetX;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  // Navigate to next slide or finish onboarding
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  // Skip onboarding
  const handleSkip = () => {
    navigation.navigate('Login');
  };

  // Render onboarding item
  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => {
    return (
      <Box w={width} px={6} justifyContent="center">
        <Center mb={10}>
          <Image
            source={{ uri: item.image }}
            alt={item.title}
            w={220}
            h={220}
            resizeMode="contain"
            fallbackElement={
              <Center w={220} h={220} bg="light.200" borderRadius="full">
                <Text fontSize="xl" color="text.secondary">Image</Text>
              </Center>
            }
          />
        </Center>
        <VStack space={4} alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            {item.title}
          </Text>
          <Text fontSize="md" textAlign="center" color="text.secondary">
            {item.description}
          </Text>
        </VStack>
      </Box>
    );
  };

  // Button text based on current index
  const buttonText = currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next';

  return (
    <Box flex={1} bg="white" safeArea>
      <Box position="absolute" top={10} right={6}>
        <Pressable onPress={handleSkip}>
          <Text color="primary.500" fontWeight="medium">
            Skip
          </Text>
        </Pressable>
      </Box>

      <VStack flex={1} justifyContent="space-between">
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />

        <VStack px={6} pb={10} space={6}>
          <HStack justifyContent="center" space={2}>
            {onboardingData.map((_, index) => {
              // Create animated styles for dots
              const dotStyle = useAnimatedStyle(() => {
                const opacity = interpolate(
                  scrollX.value,
                  [(index - 1) * width, index * width, (index + 1) * width],
                  [0.3, 1, 0.3],
                  Extrapolate.CLAMP
                );
                
                const width = interpolate(
                  scrollX.value,
                  [(index - 1) * width, index * width, (index + 1) * width],
                  [8, 16, 8],
                  Extrapolate.CLAMP
                );
                
                return {
                  opacity,
                  width,
                };
              });

              return (
                <Animated.View
                  key={index.toString()}
                  style={[
                    {
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#2196F3',
                      marginHorizontal: 2,
                    },
                    dotStyle,
                  ]}
                />
              );
            })}
          </HStack>

          <Button
            size="lg"
            bg="primary.500"
            _pressed={{ bg: 'primary.600' }}
            onPress={handleNext}
          >
            {buttonText}
          </Button>

          {currentIndex === onboardingData.length - 1 && (
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text textAlign="center" color="text.secondary">
                Already have an account?{' '}
                <Text color="primary.500" fontWeight="semibold">
                  Sign In
                </Text>
              </Text>
            </Pressable>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default OnboardingScreen;
