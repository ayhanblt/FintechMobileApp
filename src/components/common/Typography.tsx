import React from 'react';
import { Text, Heading, ITextProps, IHeadingProps } from 'native-base';

export type TextVariant = 'body' | 'caption' | 'subtitle' | 'overline' | 'button';

export type TypographyProps = ITextProps & {
  variant?: TextVariant;
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  ...props
}) => {
  // Variant-specific styles
  const variantStyles: Record<TextVariant, ITextProps> = {
    body: {
      fontSize: 'md',
      fontWeight: 'normal',
      color: 'text.primary',
    },
    caption: {
      fontSize: 'xs',
      fontWeight: 'normal',
      color: 'text.tertiary',
    },
    subtitle: {
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
    },
    overline: {
      fontSize: '2xs',
      fontWeight: 'semibold',
      textTransform: 'uppercase',
      letterSpacing: 'wider',
      color: 'text.tertiary',
    },
    button: {
      fontSize: 'md',
      fontWeight: 'semibold',
      color: 'primary.500',
    },
  };

  return (
    <Text {...variantStyles[variant]} {...props}>
      {children}
    </Text>
  );
};

export type HeadingSize = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type HeadingComponentProps = IHeadingProps & {
  size?: HeadingSize;
};

export const HeadingComponent: React.FC<HeadingComponentProps> = ({
  size = 'md',
  children,
  ...props
}) => {
  // Heading size mappings
  const sizeStyles: Record<HeadingSize, IHeadingProps> = {
    '2xl': {
      fontSize: '4xl',
      fontWeight: 'bold',
      lineHeight: '4xl',
    },
    xl: {
      fontSize: '3xl',
      fontWeight: 'bold',
      lineHeight: '3xl',
    },
    lg: {
      fontSize: '2xl',
      fontWeight: 'bold',
      lineHeight: '2xl',
    },
    md: {
      fontSize: 'xl',
      fontWeight: 'semibold',
      lineHeight: 'xl',
    },
    sm: {
      fontSize: 'lg',
      fontWeight: 'semibold',
      lineHeight: 'lg',
    },
    xs: {
      fontSize: 'md',
      fontWeight: 'semibold',
      lineHeight: 'md',
    },
  };

  return (
    <Heading color="text.primary" {...sizeStyles[size]} {...props}>
      {children}
    </Heading>
  );
};
