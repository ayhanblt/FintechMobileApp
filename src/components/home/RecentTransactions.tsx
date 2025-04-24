import React from 'react';
import { Box, VStack, HStack, Pressable } from 'native-base';
import { Typography } from '../common/Typography';
import { TransactionItem, TransactionType } from '../common/TransactionItem';

export type Transaction = {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status?: 'completed' | 'pending' | 'failed';
};

export type RecentTransactionsProps = {
  transactions: Transaction[];
  onViewAll?: () => void;
  onTransactionPress?: (transaction: Transaction) => void;
};

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onViewAll,
  onTransactionPress,
}) => {
  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="center" mb={4}>
        <Typography fontWeight="semibold" fontSize="lg">
          Recent Transactions
        </Typography>
        <Pressable onPress={onViewAll}>
          <Typography variant="button" color="primary.500">
            View All
          </Typography>
        </Pressable>
      </HStack>

      <VStack>
        {transactions.length === 0 ? (
          <Box
            py={8}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="subtitle" color="text.tertiary">
              No transactions yet
            </Typography>
          </Box>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              {...transaction}
              onPress={() => onTransactionPress?.(transaction)}
            />
          ))
        )}
      </VStack>
    </Box>
  );
};
