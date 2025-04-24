import React from 'react';
import { Box, IBoxProps } from 'native-base';

export type CardProps = IBoxProps & {
  variant?: 'elevated' | 'outline' | 'filled' | 'unstyled';
};

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  children,
  ...props
}) => {
  // Base styles for all variants
  const baseStyles: IBoxProps = {
    p: 4,
    borderRadius: 'lg',
    overflow: 'hidden',
  };

  // Variant-specific styles
  const variantStyles: Record<string, IBoxProps> = {
    elevated: {
      bg: 'white',
      shadow: 2,
    },
    outline: {
      bg: 'transparent',
      borderWidth: 1,
      borderColor: 'card.border',
    },
    filled: {
      bg: 'card.background',
    },
    unstyled: {},
  };

  return (
    <Box {...baseStyles} {...variantStyles[variant]} {...props}>
      {children}
    </Box>
  );
};
