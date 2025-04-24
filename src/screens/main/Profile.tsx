import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Icon,
  Divider,
  Pressable,
  ScrollView,
  Switch,
  useToast,
  AlertDialog,
  Button,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { themeMode, toggleTheme } = useApp();
  const toast = useToast();

  // Logout confirmation dialog
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  // Handle profile edit
  const handleEditProfile = () => {
    toast.show({
      title: 'Edit Profile',
      description: 'This feature is coming soon!',
      status: 'info',
    });
  };

  // Handle menu item press
  const handleMenuItemPress = (title: string) => {
    toast.show({
      title,
      description: 'This feature is coming soon!',
      status: 'info',
    });
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // Logout is handled by AuthContext which will redirect to the login screen
    } catch (error) {
      console.error('Logout error:', error);
      toast.show({
        title: 'Error',
        description: 'Failed to logout. Please try again.',
        status: 'error',
      });
    }
  };

  // Profile menu sections
  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: 'user', title: 'Personal Information', onPress: () => handleMenuItemPress('Personal Information') },
        { icon: 'shield', title: 'Security', onPress: () => handleMenuItemPress('Security') },
        { icon: 'credit-card', title: 'Payment Methods', onPress: () => handleMenuItemPress('Payment Methods') },
        { icon: 'bell', title: 'Notifications', onPress: () => handleMenuItemPress('Notifications') },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'globe', title: 'Language', value: 'English', onPress: () => handleMenuItemPress('Language') },
        { icon: 'moon', title: 'Dark Mode', isSwitch: true, value: themeMode === 'dark', onToggle: toggleTheme },
        { icon: 'dollar-sign', title: 'Currency', value: 'USD', onPress: () => handleMenuItemPress('Currency') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', title: 'Help Center', onPress: () => handleMenuItemPress('Help Center') },
        { icon: 'message-circle', title: 'Contact Support', onPress: () => handleMenuItemPress('Contact Support') },
        { icon: 'info', title: 'About', onPress: () => handleMenuItemPress('About') },
      ],
    },
  ];

  return (
    <Box flex={1} bg="background.light" pt={insets.top}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={6} pb={6}>
          {/* Header */}
          <Box px={6} pt={4}>
            <Text fontSize="xl" fontWeight="bold">Profile</Text>
          </Box>

          {/* User Profile Card */}
          <Box px={6}>
            <Box bg="white" p={6} borderRadius="lg" shadow={1}>
              <VStack space={4} alignItems="center">
                <Avatar 
                  size="xl" 
                  source={user?.avatarUrl ? { uri: user.avatarUrl } : undefined}
                  bg="primary.500"
                >
                  {user?.name?.[0] || 'U'}
                </Avatar>
                <VStack space={1} alignItems="center">
                  <Text fontSize="xl" fontWeight="bold">{user?.name || 'User'}</Text>
                  <Text color="text.secondary">{user?.email || 'user@example.com'}</Text>
                </VStack>
                <Button variant="outline" onPress={handleEditProfile}>
                  Edit Profile
                </Button>
              </VStack>
            </Box>
          </Box>

          {/* Menu Sections */}
          {menuSections.map((section, sectionIndex) => (
            <VStack key={section.title} px={6}>
              <Text fontSize="md" fontWeight="semibold" mb={2} color="text.secondary">
                {section.title}
              </Text>
              <Box bg="white" borderRadius="lg" shadow={1}>
                <VStack divider={<Divider bg="light.200" />}>
                  {section.items.map((item, itemIndex) => (
                    <Pressable
                      key={item.title}
                      py={4}
                      px={5}
                      onPress={item.isSwitch ? undefined : item.onPress}
                    >
                      <HStack alignItems="center" justifyContent="space-between">
                        <HStack space={3} alignItems="center">
                          <Icon as={Feather} name={item.icon as any} size={5} color="text.secondary" />
                          <Text fontSize="md">{item.title}</Text>
                        </HStack>
                        {item.isSwitch ? (
                          <Switch
                            isChecked={item.value as boolean}
                            onToggle={item.onToggle}
                            colorScheme="primary"
                          />
                        ) : item.value ? (
                          <HStack space={2} alignItems="center">
                            <Text color="text.tertiary">{item.value}</Text>
                            <Icon as={Feather} name="chevron-right" size={4} color="text.tertiary" />
                          </HStack>
                        ) : (
                          <Icon as={Feather} name="chevron-right" size={4} color="text.tertiary" />
                        )}
                      </HStack>
                    </Pressable>
                  ))}
                </VStack>
              </Box>
            </VStack>
          ))}

          {/* Logout Button */}
          <Box px={6} mt={4}>
            <Pressable
              py={4}
              bg="white"
              borderRadius="lg"
              shadow={1}
              onPress={() => setIsOpen(true)}
            >
              <HStack space={3} alignItems="center" px={5}>
                <Icon as={Feather} name="log-out" size={5} color="error" />
                <Text fontSize="md" color="error">Logout</Text>
              </HStack>
            </Pressable>
          </Box>

          {/* Version info */}
          <Text textAlign="center" color="text.tertiary" fontSize="sm" mt={4}>
            Version 1.0.0
          </Text>
        </VStack>
      </ScrollView>

      {/* Logout Confirmation Dialog */}
      <AlertDialog 
        leastDestructiveRef={cancelRef} 
        isOpen={isOpen} 
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Logout</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to logout from your account?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={handleLogout}>
                Logout
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default ProfileScreen;
