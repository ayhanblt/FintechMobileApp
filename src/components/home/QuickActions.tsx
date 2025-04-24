import React from 'react';
import { Box, HStack, VStack, Pressable, Text, ScrollView } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../common/Typography';

export type QuickActionItem = {
  id: string;
  icon: string;
  title: string;
  color: string;
  onPress: () => void;
};

export type QuickActionsProps = {
  title?: string;
  actions: QuickActionItem[];
};

export const QuickActions: React.FC<QuickActionsProps> = ({
  title = 'Quick Actions',
  actions,
}) => {
  return (
    <Box mb={6}>
      <Typography fontWeight="semibold" fontSize="lg" mb={4}>
        {title}
      </Typography>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space={4} pb={2}>
          {actions.map((action) => (
            <Pressable key={action.id} onPress={action.onPress}>
              <VStack
                alignItems="center"
                minW={16}
                maxW={20}
              >
                <Box
                  bg={`${action.color}Alpha.100`}
                  p={3}
                  borderRadius="full"
                  mb={2}
                >
                  <Feather
                    name={action.icon as any}
                    size={24}
                    color={action.color}
                  />
                </Box>
                <Typography
                  variant="caption"
                  textAlign="center"
                  numberOfLines={1}
                  isTruncated
                >
                  {action.title}
                </Typography>
              </VStack>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};
