import React from 'react';
import { useAuthStore } from '@stores/authStore';
import { AuthStack } from '@navigation/AuthStack';
import { MainTabs } from '@navigation/MainTabs';

export const RootNavigator = () => {
  // Lấy token từ Zustand Store: có token -> MainTabs, chưa có -> AuthStack
  const token = useAuthStore((state) => state.token);

  return token ? <MainTabs /> : <AuthStack />;
};