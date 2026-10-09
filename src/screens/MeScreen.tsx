import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Watermark } from '@components/Watermark';
import { VARIANT, STUDENT, examStamp } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';

export const MeScreen = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <SafeAreaView style={styles.container}>
      {VARIANT.watermarkAtTop && <Watermark />}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{STUDENT.hoTen}</Text>
        <Text style={styles.sub}>{STUDENT.mssv} · #{examStamp()}</Text>

        <TouchableOpacity style={styles.btn} onPress={logout} activeOpacity={0.8}>
          <Text style={styles.btnText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16, backgroundColor: COLORS.primary },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  name: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  sub: { fontSize: 14, color: COLORS.textLight, marginTop: 4, marginBottom: 24 },
  btn: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  btnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
});