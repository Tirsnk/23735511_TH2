import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT, examStamp, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

export const Watermark = () => {
  // Định dạng bắt buộc của đề: TH2 · {mssv} · {hoTen} · #{examStamp()}
  const stampText = `TH2 · ${STUDENT.mssv} · ${STUDENT.hoTen} · #${examStamp()}`;

  return (
    <View style={[styles.container, VARIANT.watermarkAtTop ? styles.top : styles.bottom]}>
      <Text style={styles.text}>{stampText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 999,
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.text,
  },
});