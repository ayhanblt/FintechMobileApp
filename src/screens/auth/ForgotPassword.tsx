import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  FormControl,
  Input,
  Icon,
  IconButton,
  useToast,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuth } from '../../context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const { forgotPassword } = useAuth();
  const toast = useToast();

  // Form state
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form validation
  const [error, setError] = useState('');

  // Validate email
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    if (!email) return 'Email is required';
    if (!re.test(email)) return 'Invalid email address';
    return '';
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    // Validate email
    const emailError = validateEmail(email);
    setError(emailError);

    // If there's no error, proceed
    if (!emailError) {
      try {
        setIsLoading(true);
        await forgotPassword(email);
        
        // Show success message
        toast.show({
          title: 'Email Sent',
          description: 'Please check your email for the password reset link',
          status: 'success',
          duration: 5000,
        });
        
        // Navigate to verify OTP screen
        navigation.navigate('VerifyOTP', { email });
      } catch (error: any) {
        toast.show({
          title: 'Error',
          description: error.message || 'Failed to process forgot password request',
          status: 'error',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box flex={1} bg="white" safeArea>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Box px={6} pt={12} pb={6}>
          <IconButton
            icon={<Icon as={Feather} name="arrow-left" size="lg" color="text.primary" />}
            onPress={() => navigation.goBack()}
            position="absolute"
            top={12}
            left={6}
            borderRadius="full"
            variant="ghost"
          />

          <VStack space={6} mt={16}>
            <VStack space={2}>
              <Text fontSize="3xl" fontWeight="bold">
                Forgot Password
              </Text>
              <Text color="text.secondary">
                Enter your email address to receive a verification code
              </Text>
            </VStack>

            <VStack space={4} mt={6}>
              <FormControl isInvalid={!!error}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  InputLeftElement={
                    <Icon as={Feather} name="mail" size={5} ml={4} color="text.tertiary" />
                  }
                />
                {error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
              </FormControl>

              <Button
                size="lg"
                mt={6}
                isLoading={isLoading}
                onPress={handleForgotPassword}
              >
                Send Verification Code
              </Button>

              <Button
                variant="ghost"
                _text={{ color: 'text.secondary' }}
                onPress={() => navigation.navigate('Login')}
                mt={2}
              >
                Back to Sign In
              </Button>
            </VStack>
          </VStack>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default ForgotPasswordScreen;
