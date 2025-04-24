import React from 'react';
import { Avatar as NBAvatar, IAvatarProps, Box } from 'native-base';

export type AvatarProps = IAvatarProps & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  name?: string;
  src?: string;
  showBadge?: boolean;
  badgeColor?: string;
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  name,
  src,
  showBadge = false,
  badgeColor = 'success',
  badgePosition = 'bottom-right',
  ...props
}) => {
  // Get initials from name
  const getInitials = (name?: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get badge position styles
  const getBadgePosition = () => {
    switch (badgePosition) {
      case 'top-right':
        return { top: 0, right: 0 };
      case 'top-left':
        return { top: 0, left: 0 };
      case 'bottom-left':
        return { bottom: 0, left: 0 };
      case 'bottom-right':
      default:
        return { bottom: 0, right: 0 };
    }
  };

  // Badge size based on avatar size
  const badgeSize = {
    xs: 2,
    sm: 2.5,
    md: 3,
    lg: 3.5,
    xl: 4,
    '2xl': 5,
  }[size];

  return (
    <Box position="relative" display="inline-flex">
      <NBAvatar
        size={size}
        source={src ? { uri: src } : undefined}
        {...props}
      >
        {getInitials(name)}
      </NBAvatar>

      {showBadge && (
        <Box
          position="absolute"
          w={badgeSize}
          h={badgeSize}
          bg={badgeColor}
          borderRadius="full"
          borderWidth={2}
          borderColor="white"
          {...getBadgePosition()}
        />
      )}
    </Box>
  );
};
