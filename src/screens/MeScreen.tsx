import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Watermark } from '@components/Watermark';
import { VARIANT, STUDENT, examStamp } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { useCartStore } from '@stores/cartStore';

export const MeScreen = () => {
  const logout = useAuthStore((s) => s.logout);
  const setStoreShippingFee = useCartStore((s) => s.setShippingFee);
  const { permissionStatus, distanceKm, shippingFee, requestLocation, openSettings } =
    useCampusLocation();

  const handleGetLocation = async () => {
    const fee = await requestLocation();
    if (fee) {
      setStoreShippingFee(fee); // Phản ánh phí ship sang Cart
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {VARIANT.watermarkAtTop && <Watermark />}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{STUDENT.hoTen}</Text>
        <Text style={styles.sub}>{STUDENT.mssv} · #{examStamp()}</Text>

        <View style={styles.infoBox}>
          <Text style={[styles.statusText, permissionStatus === 'granted' ? styles.green : styles.orange]}>
            Quyền: {permissionStatus}
          </Text>
          <Text style={styles.infoLine}>
            ≈ {distanceKm ? distanceKm : '1.2'} km tới cổng KTX
          </Text>
          <Text style={styles.feeLabel}>Phí ship ước tính</Text>
          <Text style={styles.feeValue}>
            {shippingFee ? `${shippingFee.toLocaleString('vi-VN')} đ` : '12.800 đ'}
          </Text>
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={handleGetLocation} activeOpacity={0.8}>
          <Text style={styles.btnPrimaryText}>Lấy vị trí ước tính ship</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={openSettings} activeOpacity={0.8}>
          <Text style={styles.btnOutlineText}>Mở Cài đặt </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={logout} activeOpacity={0.8}>
          <Text style={styles.btnLogoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 14, backgroundColor: COLORS.primary },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  name: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  sub: { fontSize: 13, color: COLORS.textLight, marginTop: 4, marginBottom: 20 },
  infoBox: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  statusText: { fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  green: { color: COLORS.success },
  orange: { color: COLORS.secondary },
  infoLine: { fontSize: 14, color: COLORS.text, marginBottom: 6 },
  feeLabel: { fontSize: 13, color: COLORS.textLight },
  feeValue: { fontSize: 20, fontWeight: '900', color: COLORS.secondary, marginTop: 2 },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  btnOutline: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  btnOutlineText: { color: COLORS.primary, fontSize: 15, fontWeight: '700' },
  btnLogout: {
    backgroundColor: COLORS.error,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnLogoutText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});