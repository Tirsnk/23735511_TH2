import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Watermark } from '@components/Watermark';
import { ProductCard } from '@components/ProductCard';
import { fetchProducts, ProductItem } from '@services/productApi';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import {
  STUDENT,
  ROOM_LABEL,
  DEBOUNCE_MS,
  STALE_TIME_MS,
  VARIANT,
} from '@constants/student';
import { COLORS } from '@constants/theme';
import { ShopStackParamList } from '@navigation/ShopStack';

type HomeNavProp = NativeStackNavigationProp<ShopStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeNavProp>();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm, DEBOUNCE_MS);

  // React Query quản lý Server State, thời gian cache theo STALE_TIME_MS (21s)
  const {
    data: products,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery<ProductItem[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME_MS,
  });

  // Lọc sản phẩm theo chuỗi đã Debounce
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!debouncedSearch.trim()) return products;
    return products.filter((item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  const renderContent = () => {
    // TRẠNG THÁI 1: ĐANG TẢI (ActivityIndicator xoay)
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Đang tải món...</Text>
        </View>
      );
    }

    // TRẠNG THÁI 2: LỖI MẠNG (Hiện rõ MSSV và nút Thử lại đúng đề)
    if (isError) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
          <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()} activeOpacity={0.8}>
            <Text style={styles.retryBtnText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // TRẠNG THÁI 3: CÓ DỮ LIỆU LƯỚI 2 CỘT (FlashList numColumns=2)
    return (
      <View style={styles.listContainer}>
        <FlashList
          data={filteredProducts}
          numColumns={2}
          estimatedItemSize={210}
          keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('Detail', { id: String(item.id) })}
              onAddToCart={() => {
                // Sẽ nối vào CartStore ở Câu 3
              }}
            />
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {VARIANT.watermarkAtTop && <Watermark />}

      {/* Header (A) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KTXGO</Text>
        <Text style={styles.headerSub}>Giao tận {ROOM_LABEL}</Text>
      </View>

      {/* Ô tìm kiếm Debounce (B) */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
          placeholderTextColor={COLORS.textLight}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Nội dung 3 trạng thái (C) */}
      {renderContent()}

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  headerSub: { fontSize: 13, color: '#BFDBFE', marginTop: 2 },
  searchBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.text,
  },
  listContainer: { flex: 1, paddingHorizontal: 4 },
  listPadding: { paddingBottom: 16 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: { marginTop: 12, fontSize: 14, color: COLORS.textLight, fontWeight: '500' },
  errorMssv: { fontSize: 18, fontWeight: '800', color: COLORS.error, marginBottom: 4 },
  errorText: { fontSize: 14, color: COLORS.textLight, marginBottom: 16 },
  retryBtn: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});