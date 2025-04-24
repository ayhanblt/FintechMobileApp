import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  FormControl,
  Input,
  Pressable,
  Icon,
  IconButton,
  HStack,
  Checkbox,
  useToast,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuth } from '../../context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const { register } = useAuth();
  const toast = useToast();

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form validation
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      fullName: !fullName ? 'Full name is required' : '',
      email: !email 
        ? 'Email is required' 
        : !/\S+@\S+\.\S+/.test(email) 
          ? 'Invalid email address' 
          : '',
      password: !password 
        ? 'Password is required' 
        : password.length < 6 
          ? 'Password must be at least 6 characters' 
          : '',
      confirmPassword: !confirmPassword 
        ? 'Please confirm your password' 
        : confirmPassword !== password 
          ? 'Passwords do not match' 
          : '',
      terms: !agreedToTerms ? 'You must agree to the terms and conditions' : '',
    };

    setErrors(newErrors);

    // Return true if there are no errors
    return !Object.values(newErrors).some(error => error);
  };

  // Handle registration
  const handleRegister = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        await register(fullName, email, password);
        // Registration success is handled by AuthContext which will redirect to the main app
      } catch (error: any) {
        toast.show({
          title: 'Registration Failed',
          description: error.message || 'Something went wrong. Please try again.',
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
                Create Account
              </Text>
              <Text color="text.secondary">
                Sign up to get started with Coinpay
              </Text>
            </VStack>

            <VStack space={4} mt={6}>
              <FormControl isInvalid={!!errors.fullName}>
                <FormControl.Label>Full Name</FormControl.Label>
                <Input
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                  InputLeftElement={
                    <Icon as={Feather} name="user" size={5} ml={4} color="text.tertiary" />
                  }
                />
                {errors.fullName && (
                  <FormControl.ErrorMessage>{errors.fullName}</FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
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
                {errors.email && (
                  <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  placeholder="Create a password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChangeText={setPassword}
                  InputLeftElement={
                    <Icon as={Feather} name="lock" size={5} ml={4} color="text.tertiary" />
                  }
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)} mr={4}>
                      <Icon 
                        as={Feather} 
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={5} 
                        color="text.tertiary" 
                      />
                    </Pressable>
                  }
                />
                {errors.password && (
                  <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  InputLeftElement={
                    <Icon as={Feather} name="lock" size={5} ml={4} color="text.tertiary" />
                  }
                  InputRightElement={
                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} mr={4}>
                      <Icon 
                        as={Feather} 
                        name={showConfirmPassword ? 'eye-off' : 'eye'} 
                        size={5} 
                        color="text.tertiary" 
                      />
                    </Pressable>
                  }
                />
                {errors.confirmPassword && (
                  <FormControl.ErrorMessage>{errors.confirmPassword}</FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.terms}>
                <Checkbox
                  value="agreedToTerms"
                  isChecked={agreedToTerms}
                  onChange={setAgreedToTerms}
                  colorScheme="primary"
                  mt={2}
                >
                  <Text fontSize="sm">
                    I agree to the{' '}
                    <Text color="primary.500" fontWeight="medium">
                      Terms of Service
                    </Text>{' '}
                    and{' '}
                    <Text color="primary.500" fontWeight="medium">
                      Privacy Policy
                    </Text>
                  </Text>
                </Checkbox>
                {errors.terms && (
                  <FormControl.ErrorMessage>{errors.terms}</FormControl.ErrorMessage>
                )}
              </FormControl>
            </VStack>

            <Button
              size="lg"
              mt={6}
              isLoading={isLoading}
              onPress={handleRegister}
            >
              Sign Up
            </Button>

            <HStack justifyContent="center" mt={4}>
              <Text>
                Already have an account?{' '}
                <Text 
                  color="primary.500" 
                  fontWeight="semibold"
                  onPress={() => navigation.navigate('Login')}
                >
                  Sign In
                </Text>
              </Text>
            </HStack>
          </VStack>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default RegisterScreen;
