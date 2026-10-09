import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Watermark } from '@components/Watermark';
import { VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

export const DetailScreen = ({ route }: any) => {
  const productId = route.params?.id ?? 'Chưa có ID';

  return (
    <SafeAreaView style={styles.container}>
      {VARIANT.watermarkAtTop && <Watermark />}

      <View style={styles.body}>
        <Text style={styles.title}>Chi tiết món</Text>
        <Text style={styles.sub}>Mã sản phẩm: {productId}</Text>
      </View>

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8 },
  sub: { fontSize: 14, color: COLORS.textLight },
});