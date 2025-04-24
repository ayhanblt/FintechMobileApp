import React from 'react';
import { Button as NBButton, IButtonProps, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type ButtonProps = IButtonProps & {
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading,
  isDisabled,
  children,
  ...props
}) => {
  // Size mappings
  const sizeStyles = {
    xs: {
      px: 3,
      py: 1.5,
      fontSize: 'xs',
      borderRadius: 'sm',
    },
    sm: {
      px: 4,
      py: 2,
      fontSize: 'sm',
      borderRadius: 'md',
    },
    md: {
      px: 5,
      py: 2.5,
      fontSize: 'md',
      borderRadius: 'md',
    },
    lg: {
      px: 6,
      py: 3,
      fontSize: 'lg',
      borderRadius: 'lg',
    },
  };

  // Get button styles based on size
  const buttonSize = sizeStyles[size];

  // Icon size based on button size
  const iconSize = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
  }[size];

  return (
    <NBButton
      variant={variant}
      px={buttonSize.px}
      py={buttonSize.py}
      borderRadius={buttonSize.borderRadius}
      isLoading={isLoading}
      isDisabled={isDisabled}
      leftIcon={
        leftIcon ? (
          <Feather name={leftIcon as any} size={iconSize} color="currentColor" />
        ) : undefined
      }
      rightIcon={
        rightIcon ? (
          <Feather name={rightIcon as any} size={iconSize} color="currentColor" />
        ) : undefined
      }
      _text={{
        fontSize: buttonSize.fontSize,
        fontWeight: 'semibold',
      }}
      {...props}
    >
      {children}
    </NBButton>
  );
};
