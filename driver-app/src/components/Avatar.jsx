import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Avatar({ name = 'A', size = 40, bg = '#00A0CC', textColor = '#fff' }) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Text style={[styles.text, { fontSize: size * 0.42, color: textColor }]}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
  text: { fontWeight: '700' },
});
