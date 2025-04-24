import React, { useState } from 'react';
import {
  Input as NBInput,
  IInputProps,
  FormControl,
  Box,
  Pressable,
  Icon,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

export type InputProps = IInputProps & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  isPassword?: boolean;
  required?: boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  isPassword = false,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(!isPassword);
  
  return (
    <FormControl isInvalid={!!error} isRequired={required} mb={4}>
      {label && (
        <FormControl.Label _text={{ fontWeight: 'medium' }}>
          {label}
        </FormControl.Label>
      )}

      <Box position="relative">
        <NBInput
          variant="filled"
          bg="input.background"
          borderColor="input.border"
          px={4}
          py={3}
          fontSize="md"
          borderRadius="lg"
          _focus={{
            bg: 'white',
            borderColor: 'input.focus',
          }}
          _invalid={{
            borderColor: 'input.error',
          }}
          type={showPassword ? 'text' : 'password'}
          InputLeftElement={
            leftIcon ? (
              <Box pl={3}>
                <Feather name={leftIcon as any} size={20} color="#9E9E9E" />
              </Box>
            ) : undefined
          }
          InputRightElement={
            isPassword ? (
              <Pressable onPress={() => setShowPassword(!showPassword)} mr={3}>
                <Feather 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color="#9E9E9E" 
                />
              </Pressable>
            ) : rightIcon ? (
              <Box pr={3}>
                <Feather name={rightIcon as any} size={20} color="#9E9E9E" />
              </Box>
            ) : undefined
          }
          {...props}
        />
      </Box>

      <FormControl.ErrorMessage>
        {error}
      </FormControl.ErrorMessage>
      
      {helperText && !error && (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      )}
    </FormControl>
  );
};
