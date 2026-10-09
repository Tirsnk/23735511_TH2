import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@constants/theme';
import { STUDENT, VARIANT, examStamp } from '@constants/student';
import { useAuthStore } from '@stores/authStore';
import { Watermark } from '@components/Watermark';

export const LoginScreen = () => {
  const isEmail = VARIANT.authField === 'email';
  const defaultVal = isEmail ? `${STUDENT.mssv}@iuh.edu.vn` : `098${STUDENT.mssv.slice(-6)}`;
  const [inputValue, setInputValue] = useState(defaultVal);
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    // Tạo token giả lập ktxgo-{mssv}-{stamp} theo đúng đề
    const fakeToken = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
    login(fakeToken);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {VARIANT.watermarkAtTop && <Watermark />}
      <View style={styles.content}>
        <Text style={styles.logo}>KTXGO</Text>
        <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>
            {isEmail ? 'Email (A)' : 'Số điện thoại (A)'}
          </Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={isEmail ? 'Nhập email sinh viên' : 'Nhập số điện thoại'}
            keyboardType={isEmail ? 'email-address' : 'phone-pad'}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Vào cửa hàng</Text>
        </TouchableOpacity>

        <Text style={styles.note}>Auth Stack · chưa có token</Text>
      </View>
      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, alignItems: 'center' },
  logo: { fontSize: 36, fontWeight: '900', color: COLORS.primary, letterSpacing: 1 },
  subtitle: { fontSize: 15, color: COLORS.textLight, marginTop: 6, marginBottom: 32 },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 20,
  },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginBottom: 4, textAlign: 'right' },
  input: { fontSize: 15, color: COLORS.text, paddingVertical: 4 },
  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  note: { marginTop: 24, color: COLORS.textLight, fontSize: 12 },
});