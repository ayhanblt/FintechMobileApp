import React from 'react';
import { Box, Pressable, Text, Center, HStack, useColorModeValue } from 'native-base';
import { Feather } from '@expo/vector-icons';

export type TabItem = {
  key: string;
  title: string;
  icon: string;
};

export type TabBarProps = {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabKey: string) => void;
  variant?: 'filled' | 'transparent';
};

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'filled',
}) => {
  const bgColor = variant === 'filled' 
    ? useColorModeValue('white', 'dark.500') 
    : 'transparent';
  
  return (
    <Box
      bg={bgColor}
      borderRadius={variant === 'filled' ? 'lg' : undefined}
      shadow={variant === 'filled' ? 1 : undefined}
      px={4}
      py={2}
      mb={variant === 'filled' ? 4 : 0}
    >
      <HStack space={2} justifyContent="space-between">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          
          return (
            <Pressable
              key={tab.key}
              flex={1}
              onPress={() => onChange(tab.key)}
              py={2}
            >
              <Center>
                <Feather
                  name={tab.icon as any}
                  size={22}
                  color={
                    isActive
                      ? useColorModeValue('#2196F3', '#64B5F6')
                      : useColorModeValue('#9E9E9E', '#757575')
                  }
                />
                <Text
                  mt={1}
                  fontSize="xs"
                  fontWeight={isActive ? 'semibold' : 'normal'}
                  color={
                    isActive
                      ? useColorModeValue('primary.500', 'primary.300')
                      : useColorModeValue('text.tertiary', 'light.500')
                  }
                >
                  {tab.title}
                </Text>
              </Center>
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
};
