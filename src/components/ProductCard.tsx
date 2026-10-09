import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ProductItem } from '@services/productApi';
import { PRICE_MULTIPLIER } from '@constants/student';
import { COLORS } from '@constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 2;

interface Props {
  item: ProductItem;
  onPress: () => void;
  onAddToCart?: () => void;
}

export const ProductCard = ({ item, onPress, onAddToCart }: Props) => {
  const displayPrice = (Math.round(item.price * PRICE_MULTIPLIER)).toLocaleString('vi-VN') + ' đ';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{displayPrice}</Text>
          <TouchableOpacity style={styles.addBtn} onPress={onAddToCart} activeOpacity={0.7}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 10,
    backgroundColor: COLORS.surface,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});