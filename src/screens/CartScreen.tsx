import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Watermark } from '@components/Watermark';
import { ROOM_LABEL, VARIANT, PRICE_MULTIPLIER } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

export const CartScreen = () => {
  const items = useCartStore((state) => state.items);
  const changeQty = useCartStore((state) => state.changeQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalAmount = useCartStore((state) => state.totalAmount());
  const shippingFee = useCartStore((state) => state.shippingFee);

  const finalTotal = totalAmount + (shippingFee ?? 0);

  return (
    <SafeAreaView style={styles.container}>
      {VARIANT.watermarkAtTop && <Watermark />}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Giỏ hàng đang trống!</Text>
          </View>
        }
        renderItem={({ item }) => {
          const itemPrice = Math.round(item.price * PRICE_MULTIPLIER);
          return (
            <View style={styles.cartCard}>
              <Image source={{ uri: item.image }} style={styles.itemImg} resizeMode="contain" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemPrice}>
                  ×{item.quantity}  {(itemPrice * item.quantity).toLocaleString('vi-VN')} đ
                </Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, -1)}>
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNum}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, 1)}>
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item.id)}>
                <Text style={styles.deleteText}>🗑</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <View style={styles.shippingBox}>
          <Text style={styles.roomLabel}>Giao đến {ROOM_LABEL}</Text>
          <Text style={styles.shippingFeeText}>
            Phí ship: {shippingFee !== null ? `${shippingFee.toLocaleString('vi-VN')} đ (công thức B)` : '12.000 đ (công thức B)'}
          </Text>
        </View>

        <Text style={styles.totalText}>
          Tổng hàng: {finalTotal.toLocaleString('vi-VN')} đ
        </Text>
      </View>

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 14, backgroundColor: COLORS.primary },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  list: { padding: 12 },
  empty: { marginTop: 60, alignItems: 'center' },
  emptyText: { color: COLORS.textLight, fontSize: 15 },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImg: { width: 50, height: 50, marginRight: 10 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  itemPrice: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  qtyBtn: {
    backgroundColor: '#E2E8F0',
    width: 26,
    height: 26,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
  qtyNum: { marginHorizontal: 10, fontSize: 14, fontWeight: '600', color: COLORS.text },
  deleteBtn: { backgroundColor: COLORS.error, width: 32, height: 32, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  deleteText: { color: '#fff', fontSize: 14 },
  footer: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  shippingBox: {
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  roomLabel: { fontSize: 13, fontWeight: 'bold', color: COLORS.text },
  shippingFeeText: { fontSize: 13, color: COLORS.secondary, fontWeight: '700', marginTop: 2 },
  totalText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
});