import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from '@navigation/ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

export type MainTabParamList = {
  ShopTab: undefined;
  CartTab: undefined;
  MeTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => {
  const totalQty = useCartStore((s) => s.totalQuantity());

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
      }}
    >
      <Tab.Screen
        name="ShopTab"
        component={ShopStack}
        options={{
          title: 'Cửa hàng',
          tabBarIcon: () => <Text style={styles.icon}>🏪</Text>,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: 'Giỏ',
          tabBarIcon: () => <Text style={styles.icon}>🛒</Text>,
          tabBarBadge: totalQty > 0 ? totalQty : undefined,
        }}
      />
      <Tab.Screen
        name="MeTab"
        component={MeScreen}
        options={{
          title: 'Tôi',
          tabBarIcon: () => <Text style={styles.icon}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});