import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from '@navigation/ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { COLORS } from '@constants/theme';

export type MainTabParamList = {
  ShopTab: undefined;
  CartTab: undefined;
  MeTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
      }}
    >
      {/* Thứ tự đúng số cuối 1: Cửa hàng -> Giỏ -> Tôi */}
      <Tab.Screen
        name="ShopTab"
        component={ShopStack}
        options={{ title: 'Cửa hàng' }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: 'Giỏ',
          tabBarBadge: undefined, // Sẽ nối với số lượng giỏ hàng ở Câu 3a
        }}
      />
      <Tab.Screen
        name="MeTab"
        component={MeScreen}
        options={{ title: 'Tôi' }}
      />
    </Tab.Navigator>
  );
};