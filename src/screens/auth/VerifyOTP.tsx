import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  HStack,
  Input,
  Icon,
  IconButton,
  useToast,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native';

type VerifyOTPNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'VerifyOTP'
>;

type VerifyOTPRouteProp = RouteProp<AuthStackParamList, 'VerifyOTP'>;

const VerifyOTPScreen = () => {
  const navigation = useNavigation<VerifyOTPNavigationProp>();
  const route = useRoute<VerifyOTPRouteProp>();
  const toast = useToast();
  const { email } = route.params;

  // OTP state
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  
  // Refs for input fields
  const inputRefs = useRef<TextInput[]>([]);

  // Start resend timer
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format timer
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP change
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key press
  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input if backspace is pressed and current input is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle verify OTP
  const handleVerifyOTP = () => {
    const otpValue = otp.join('');
    
    // Check if OTP is complete
    if (otpValue.length !== 4) {
      toast.show({
        title: 'Incomplete OTP',
        description: 'Please enter the 4-digit verification code',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    // Simulate OTP verification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // For this demo, we'll accept any 4-digit code
      // In a real app, you would verify this with your backend
      toast.show({
        title: 'Success',
        description: 'OTP verified successfully. You can now reset your password.',
        status: 'success',
        duration: 3000,
      });
      
      // Navigate back to login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 1500);
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    if (resendTimer > 0) return;
    
    // Simulate resending OTP
    toast.show({
      title: 'OTP Resent',
      description: 'A new verification code has been sent to your email',
      status: 'success',
      duration: 3000,
    });
    
    // Reset timer
    setResendTimer(60);
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
                Verification
              </Text>
              <Text color="text.secondary">
                Enter the 4-digit code sent to {email}
              </Text>
            </VStack>

            <VStack space={6} mt={6}>
              <HStack space={4} justifyContent="center">
                {[0, 1, 2, 3].map((index) => (
                  <Input
                    key={index}
                    ref={(ref) => {
                      if (ref) {
                        inputRefs.current[index] = ref;
                      }
                    }}
                    w={16}
                    h={16}
                    textAlign="center"
                    fontSize="2xl"
                    keyboardType="number-pad"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    p={2}
                  />
                ))}
              </HStack>

              <Button
                size="lg"
                isLoading={isLoading}
                onPress={handleVerifyOTP}
              >
                Verify
              </Button>

              <HStack justifyContent="center" space={1} mt={2}>
                <Text color="text.secondary">Didn't receive the code?</Text>
                <Button
                  variant="unstyled"
                  p={0}
                  h="auto"
                  _text={{
                    color: resendTimer > 0 ? 'text.tertiary' : 'primary.500',
                    fontWeight: 'semibold',
                  }}
                  isDisabled={resendTimer > 0}
                  onPress={handleResendOTP}
                >
                  {resendTimer > 0 ? `Resend in ${formatTimer(resendTimer)}` : 'Resend'}
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default VerifyOTPScreen;
