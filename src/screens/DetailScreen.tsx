import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { Watermark } from '@components/Watermark';
import { STUDENT, VARIANT, PRICE_MULTIPLIER } from '@constants/student';
import { COLORS } from '@constants/theme';
import { fetchProducts, ProductItem } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';

export const DetailScreen = ({ route }: any) => {
  const { id } = route.params;
  const addItem = useCartStore((state) => state.addItem);

  const { data: products } = useQuery<ProductItem[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const product = products?.find((p) => String(p.id) === String(id));
  const displayPrice = product
    ? (Math.round(product.price * PRICE_MULTIPLIER)).toLocaleString('vi-VN') + ' đ'
    : '...';

const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    Alert.alert('KTXGo', `${STUDENT.mssv} - Đã thêm món vào giỏ hàng thành công!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {VARIANT.watermarkAtTop && <Watermark />}

      <View style={styles.content}>
        {product?.image ? (
          <View style={styles.imageBox}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
          </View>
        ) : null}

        <Text style={styles.title}>{product?.title ?? `Món #${id}`}</Text>
        <Text style={styles.price}>{displayPrice}</Text>
        <Text style={styles.subTag}>Giao nội khu · nhận tận phòng</Text>

        <Text style={styles.desc} numberOfLines={3}>
          {product?.description ?? 'Mô tả ngắn từ API (tối đa 3 dòng).'}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Thêm vào giỏ · Haptic</Text>
        </TouchableOpacity>
      </View>

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  imageBox: {
    width: '100%',
    height: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  image: { width: '100%', height: '100%' },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.text, textAlign: 'center', marginBottom: 6 },
  price: { fontSize: 20, fontWeight: '900', color: COLORS.primary, marginBottom: 4 },
  subTag: { fontSize: 12, color: COLORS.textLight, marginBottom: 12 },
  desc: { fontSize: 13, color: COLORS.textLight, textAlign: 'center', lineHeight: 18, marginBottom: 24 },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});