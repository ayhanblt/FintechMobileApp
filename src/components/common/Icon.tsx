import React from 'react';
import { Box, IBoxProps } from 'native-base';
import { Feather } from '@expo/vector-icons';

export type IconProps = IBoxProps & {
  name: string;
  size?: number;
  color?: string;
  bg?: string;
  variant?: 'solid' | 'outline' | 'ghost';
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'text.primary',
  bg,
  variant = 'ghost',
  ...props
}) => {
  // Variant-specific styles
  const variantStyles: Record<string, IBoxProps> = {
    solid: {
      bg: bg || 'primary.500',
      p: 2,
      borderRadius: 'full',
    },
    outline: {
      bg: 'transparent',
      p: 2,
      borderWidth: 1,
      borderColor: bg || 'primary.500',
      borderRadius: 'full',
    },
    ghost: {
      bg: 'transparent',
    },
  };

  // Determine icon color based on variant
  const getIconColor = () => {
    if (variant === 'solid') {
      return 'white';
    }
    return color;
  };

  return (
    <Box {...variantStyles[variant]} {...props}>
      <Feather name={name as any} size={size} color={getIconColor()} />
    </Box>
  );
};
