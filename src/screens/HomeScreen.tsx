import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Watermark } from '@components/Watermark';
import { VARIANT, ROOM_LABEL } from '@constants/student';
import { COLORS } from '@constants/theme';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {VARIANT.watermarkAtTop && <Watermark />}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>KTXGO</Text>
        <Text style={styles.headerSub}>Giao tận {ROOM_LABEL}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>Màn hình Cửa hàng (Home)</Text>
      </View>

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16, backgroundColor: COLORS.primary },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSub: { fontSize: 13, color: '#BFDBFE', marginTop: 2 },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 15, color: COLORS.text, fontWeight: '600' },
});