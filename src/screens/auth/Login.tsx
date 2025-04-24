import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  FormControl,
  Input,
  Pressable,
  HStack,
  Center,
  Checkbox,
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

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { login } = useAuth();
  const toast = useToast();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form validation
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Validate email
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    if (!email) return 'Email is required';
    if (!re.test(email)) return 'Invalid email address';
    return '';
  };

  // Validate password
  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // Handle login
  const handleLogin = async () => {
    // Validate form
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError,
      password: passwordError,
    });

    // If there are no errors, proceed with login
    if (!emailError && !passwordError) {
      try {
        setIsLoading(true);
        await login(email, password);
        // Login success is handled by AuthContext which will redirect to the main app
      } catch (error: any) {
        toast.show({
          title: 'Login Failed',
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
                Welcome Back!
              </Text>
              <Text color="text.secondary">
                Sign in to continue to your account
              </Text>
            </VStack>

            <VStack space={4} mt={6}>
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
                  placeholder="Enter your password"
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

              <HStack justifyContent="space-between" alignItems="center">
                <Checkbox
                  value="rememberMe"
                  isChecked={rememberMe}
                  onChange={setRememberMe}
                  colorScheme="primary"
                >
                  <Text fontSize="sm">Remember me</Text>
                </Checkbox>

                <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text color="primary.500" fontSize="sm" fontWeight="medium">
                    Forgot Password?
                  </Text>
                </Pressable>
              </HStack>
            </VStack>

            <Button
              size="lg"
              mt={6}
              isLoading={isLoading}
              onPress={handleLogin}
            >
              Sign In
            </Button>

            <Center mt={6}>
              <Pressable onPress={() => navigation.navigate('Register')}>
                <Text>
                  Don't have an account?{' '}
                  <Text color="primary.500" fontWeight="semibold">
                    Sign Up
                  </Text>
                </Text>
              </Pressable>
            </Center>
          </VStack>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default LoginScreen;
